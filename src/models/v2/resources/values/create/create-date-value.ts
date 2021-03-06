import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseDateValue } from "../type-specific-interfaces/base-date-value";
import { CreateValue } from "./create-value";

@JsonObject("CreateDateValue")
export class CreateDateValue extends CreateValue implements IBaseDateValue {

    @JsonProperty(Constants.DateValueHasCalendar, String)
    calendar: string = "";

    @JsonProperty(Constants.DateValueHasStartDay, Number, true)
    startDay?: number = undefined;

    @JsonProperty(Constants.DateValueHasStartMonth, Number, true)
    startMonth?: number = undefined;

    @JsonProperty(Constants.DateValueHasStartYear, Number)
    startYear: number = 0;

    @JsonProperty(Constants.DateValueHasStartEra, String)
    startEra: string = "";

    @JsonProperty(Constants.DateValueHasEndDay, Number, true)
    endDay?: number = undefined;

    @JsonProperty(Constants.DateValueHasEndMonth, Number, true)
    endMonth?: number = undefined;

    @JsonProperty(Constants.DateValueHasEndYear, Number)
    endYear: number = 0;

    @JsonProperty(Constants.DateValueHasEndEra, String)
    endEra: string = "";

    constructor() {
        super(Constants.DateValue);
    }

}
