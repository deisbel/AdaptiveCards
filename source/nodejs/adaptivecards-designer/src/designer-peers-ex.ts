import * as Adaptive from "adaptivecards";
import { 
    ChoiceSetInputPeer, ToggleInputPeer, PropertySheet, 
    PropertySheetCategory, ObjectPropertyEditor, PropertySheetContext,
    InputPeer, StringPropertyEditor, BooleanPropertyEditor, 
    ChoicePropertyEditor, NameValuePairPropertyEditor 
} from "./designer-peers";

export class ObjectOrStringPropertyEditor extends ObjectPropertyEditor {
    protected setPropertyValue(context: PropertySheetContext, value: string) {
        try {
            context.target[this.propertyName] = JSON.parse(value);
        } 
        catch {
            context.target[this.propertyName] = value;
        }
    }
}


export class ToggleVisibilityChoiceSetInputPeer extends InputPeer<Adaptive.ToggleVisibilityChoiceSetInput> {
    static readonly targetIdsProperty = new ObjectOrStringPropertyEditor(Adaptive.Versions.v1_0, "targetIds", "Target Ids", true, true);

    static readonly defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    static readonly placeholderProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "placeholder", "Placeholder");
    static readonly isMultiselectProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "isMultiSelect", "Allow multi selection");
    static readonly styleProperty = new ChoicePropertyEditor(
        Adaptive.Versions.v1_0,
        "style",
        "Style",
        [
            { targetVersion: Adaptive.Versions.v1_0, name: "Compact", value: "compact" },
            { targetVersion: Adaptive.Versions.v1_0, name: "Expanded", value: "expanded" },
            { targetVersion: Adaptive.Versions.v1_5, name: "Filtered", value: "filtered" }
        ],
        true);
    static readonly wrapProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_2, "wrap", "Wrap");
    static readonly choicesProperty = new NameValuePairPropertyEditor(
        Adaptive.Versions.v1_0,
        "choices",
        "title",
        "value",
        (name: string, value: string) => { return new Adaptive.Choice(name, value); },
        "Title",
        "Value",
        "Add a new choice",
        "This ChoiceSet is empty");

    populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory) {
        super.populatePropertySheet(propertySheet, defaultCategory);

        propertySheet.add(
            defaultCategory,
            ChoiceSetInputPeer.placeholderProperty,
            ChoiceSetInputPeer.isMultiselectProperty,
            ChoiceSetInputPeer.styleProperty,
            ChoiceSetInputPeer.defaultValueProperty);

        propertySheet.add(
            PropertySheetCategory.LayoutCategory,
            ToggleInputPeer.wrapProperty);

        propertySheet.add(
            "Choices",
            ChoiceSetInputPeer.choicesProperty);
        
        propertySheet.add(
            "Target IDs",
            ToggleVisibilityChoiceSetInputPeer.targetIdsProperty);
    }

    initializeCardElement() {
        super.initializeCardElement();

        this.cardElement.placeholder = "Placeholder text";

        this.cardElement.choices.push(
            new Adaptive.Choice("Choice1", "Choice 1"),
            new Adaptive.Choice("Choice2", "Choice 2")
        );

        this.cardElement.targetIds = {"Choice1": "TargetId1", "Choice2": "TargetId2"};
    }
}

