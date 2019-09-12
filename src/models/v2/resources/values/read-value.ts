import { JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { IdConverter, UriConverter } from "../../CustomConverters";

export class ReadValue {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.AttachedToUser, IdConverter)
    attachedToUser: string = "";

    @JsonProperty(Constants.ArkUrl, UriConverter)
    arkUrl: string = "";

    @JsonProperty(Constants.VersionArkUrl, UriConverter)
    versionArkUrl: string = "";

    propertyLabel?: string;

    propertyComment?: string;

    property: string;

    constructor(id?: string,
                type?: string,
                attachedToUser?: string,
                arkUrl?: string,
                versionArkUrl?: string,
                propertyLabel?: string,
                propertyComment?: string,
                property?: string) {

        if (id !== undefined) this.id = id;
        if (type !== undefined) this.type = type;
        if (attachedToUser !== undefined) this.attachedToUser = attachedToUser;
        if (arkUrl !== undefined) this.arkUrl = arkUrl;
        if (versionArkUrl !== undefined) this.versionArkUrl = versionArkUrl;
        if (propertyLabel !== undefined) this.propertyLabel = propertyLabel;
        if (propertyComment !== undefined) this.propertyComment = propertyLabel;
        if (property !== undefined) this.property = property;

    }
}