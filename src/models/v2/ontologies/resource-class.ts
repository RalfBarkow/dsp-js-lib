import {JsonConverter, JsonCustomConvert, JsonObject, JsonProperty} from "json2typescript";
import {PropertyClass} from "./property-class";

export enum Cardinality {
    "_1" = 0,
    "_0_1" = 1,
    "_0_n" = 2,
    "_1_n" = 3
}

export interface HasProperty {
    propertyIndex: string;
    cardinality: Cardinality;
    guiOrder?: number;
}

@JsonConverter
class SubClassOfConverter implements JsonCustomConvert<string[]> {
    serialize(description: string[]): any {
        const res: Array<{value: string, language: string}> = [];
        /*
        for (const key in description) {
            if (description.hasOwnProperty(key)) {
                res.push({language: key, value: description[key]});
            }
        }
        */
        return res;
    }

    deserialize(items: any[]): string[] {
        const tmp: string[] = [];

        for (const item of items) {
            if (item.hasOwnProperty("@id") && (typeof item["@id"] === "string" || item["@id"] instanceof String)) {
                 tmp.push(item["@id"]);
            }
        }
        return tmp;
    }
}


@JsonConverter
class PropertiesListConverter implements JsonCustomConvert<HasProperty[]> {
    serialize(hasProperties: HasProperty[]): any {
        const res: any = {};
        /*
        for (const key in description) {
            if (description.hasOwnProperty(key)) {
                res.push({language: key, value: description[key]});
            }
        }
        */
        return res;
    }

    deserialize(items: any[]): HasProperty[] {
        const tmp: HasProperty[] = [];

        for (const item of items) {
            if (item.hasOwnProperty("@type") && (item["@type"] === "http://www.w3.org/2002/07/owl#Restriction")) {
                let cardinality: Cardinality = Cardinality._0_n;
                if (item.hasOwnProperty("http://www.w3.org/2002/07/owl#maxCardinality")) {
                    if (item["http://www.w3.org/2002/07/owl#maxCardinality"] === 1) {
                        cardinality = Cardinality._0_1;
                    } else {
                        console.error("Inconsistent cardinality!"); // ToDo: better error message
                    }
                } else if (item.hasOwnProperty("http://www.w3.org/2002/07/owl#minCardinality")) {
                    if (item["http://www.w3.org/2002/07/owl#minCardinality"] === 1) {
                        cardinality = Cardinality._1_n;
                    } else if (item["http://www.w3.org/2002/07/owl#minCardinality"] === 0) {
                        cardinality = Cardinality._0_n;
                    } else {
                        console.error("Inconsistent cardinality!"); // ToDo: better error message
                    }
                } else if (item.hasOwnProperty("http://www.w3.org/2002/07/owl#cardinality")) {
                    if (item["http://www.w3.org/2002/07/owl#cardinality"] === 1) {
                        cardinality = Cardinality._1;
                    } else {
                        console.error("Inconsistent cardinality!"); // ToDo: better error message
                    }
                }

                let propertyIndex: string = "";
                if (item.hasOwnProperty("http://www.w3.org/2002/07/owl#onProperty")) {
                    const propstruct: any = item["http://www.w3.org/2002/07/owl#onProperty"];
                    if (propstruct.hasOwnProperty("@id") &&
                        (typeof propstruct["@id"] === "string" || propstruct["@id"] instanceof String)) {
                        propertyIndex = propstruct["@id"];
                    } else {
                        console.error("Missing property name!"); // ToDo: better error message
                    }
                }
                tmp.push({
                    propertyIndex: propertyIndex,
                    cardinality: cardinality
                });
            }
        }
        return tmp;
    }
}

@JsonObject("ResourceClass")
export class ResourceClass {
    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("http://www.w3.org/2000/01/rdf-schema#subClassOf", SubClassOfConverter)
    subClassOf: string[] = [];

    @JsonProperty("http://www.w3.org/2000/01/rdf-schema#comment", String)
    comment?: string = "";

    @JsonProperty("http://www.w3.org/2000/01/rdf-schema#label", String)
    label?: string = "";

    @JsonProperty("http://www.w3.org/2000/01/rdf-schema#subClassOf", PropertiesListConverter)
    propertiesList: HasProperty[] = [];
}
