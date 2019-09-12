import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { UriConverter } from "../../CustomConverters";
import { ReadValue } from "./read-value";

export abstract class ReadFileValue extends ReadValue {

    @JsonProperty(Constants.FileValueHasFilename, String)
    filename: string = "";

    @JsonProperty(Constants.FileValueAsUrl, UriConverter)
    fileUrl: string = "";
}

@JsonObject("ReadStillImageFileValue")
export class ReadStillImageFileValue extends ReadFileValue {

    @JsonProperty(Constants.StillImageFileValueHasDimX, Number)
    dimX: number = 0;

    @JsonProperty(Constants.StillImageFileValueHasDimY, Number)
    dimY: number = 0;

    @JsonProperty(Constants.StillImageFileValueHasIIIFBaseUrl, UriConverter)
    iiifBaseUrl: string = "";

}