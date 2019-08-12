import {JsonConverter, JsonCustomConvert, JsonObject, JsonProperty} from 'json2typescript';
import {Constants} from '../Constants';

@JsonConverter
class SubPropertyOfConverter implements JsonCustomConvert<string[]> {
    serialize(description: string[]): any {
        const res: Array<{ value: string, language: string }> = [];
        /*
        for (const key in description) {
            if (description.hasOwnProperty(key)) {
                res.push({language: key, value: description[key]});
            }
        }
        */
        return res;
    }

    deserialize(item: any): string[] {
        const tmp: string[] = [];

        if (item.hasOwnProperty('@id') && (typeof item['@id'] === 'string' || item['@id'] instanceof String)) {
            tmp.push(item['@id']);
        }

        return tmp;
    }
}

@JsonObject("PropertyClass")
export class PropertyClass {
    @JsonProperty("@id", String)
    id: string = '';

    @JsonProperty(Constants.SubPropertyOf, SubPropertyOfConverter, true)
    subPropertyOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string;

    @JsonProperty(Constants.Label, String, true)
    label?: string;

    guiElement: string;
}

// tslint:disable-next-line:max-classes-per-file
/*export class SystemPropertyClass extends PropertyClass {

}*/

// tslint:disable-next-line:max-classes-per-file
/*export class ProjectPropertyClass extends PropertyClass {

}*/
