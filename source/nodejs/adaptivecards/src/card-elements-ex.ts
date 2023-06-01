import { ChoiceSetInput } from "./card-elements";
import { Versions, property, CustomProperty } from "./serialization";
import { GlobalRegistry } from "./registry";

export class ToggleVisibilityChoiceSetInput extends ChoiceSetInput {
    static readonly targetIdsProperty = new CustomProperty(
        Versions.v1_0,
        "targetIds",
        (
            _sender,
            prop,
            source,
        ) => source[prop.name],
        (
            _sender,
            prop,
            target,
            value,
            context,
        ) => context.serializeValue(target, prop.name, value),
        {},
        () => ({}),
    );

    @property(ToggleVisibilityChoiceSetInput.targetIdsProperty)
    targetIds: { [key: string]: any } = {};

    static readonly JsonTypeName: string = "Input.ToggleVisibilityChoiceSet";

    getJsonTypeName() {
        return ToggleVisibilityChoiceSetInput.JsonTypeName;
    }

    protected valueChanged() {
        let choiceSelectedValue = this.value;

        for (let itemId of Object.keys(this.targetIds)) {
            let element = this.getRootElement().getElementById(this.targetIds[itemId]);

            if (element) {
                element.isVisible = itemId == choiceSelectedValue;
            }
        }

        super.valueChanged();
    }

    public render(): HTMLElement | undefined {
        var result = super.render();

        this.valueChanged();

        return result;
    }

    // public overrideInternalRender(): HTMLElement | undefined {
    //     return super.overrideInternalRender();
    // }
}


GlobalRegistry.defaultElements.register(ToggleVisibilityChoiceSetInput.JsonTypeName, ToggleVisibilityChoiceSetInput);

