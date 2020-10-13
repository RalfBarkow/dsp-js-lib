import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ApiResponseData } from "../../../models/api-response-data";
import { HealthResponse } from "../../../models/system/health-response";
import { ApiResponseError } from "../../../models/api-response-error";

describe("HealthEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getHealthStatus", () => {

        it("should return health status", done => {

            knoraApiConnection.system.healthEndpoint.getHealthStatus().subscribe(
                (response: ApiResponseData<HealthResponse>) => {

                    expect(response.body.name).toEqual("AppState");
                    expect(response.body.message).toEqual("Application is healthy");
                    expect(response.body.severity).toEqual("non fatal");
                    expect(response.body.status).toEqual("healthy");

                    expect(response.body.webapiVersion).toEqual("v13.0.0-rc.16");
                    expect(response.body.akkaVersion).toEqual("10.1.12");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const health = require("../../../../test/data/api/system/health/get-health-response.json");

            request.respondWith({
                status: 200,
                responseText: JSON.stringify(health),
                responseHeaders: {
                    server: "webapi/v13.0.0-rc.16 akka-http/10.1.12"
                }
            });

            expect(request.url).toBe("http://localhost:3333/health");

            expect(request.method).toEqual("GET");

        });

        it("should return throw an error if the header server param is missing", done => {

            knoraApiConnection.system.healthEndpoint.getHealthStatus().subscribe(
                (response: ApiResponseData<HealthResponse>) => {},
                (err: ApiResponseError) => {
                    expect(err.error instanceof Error).toBeTruthy();
                    expect((err.error as Error).message).toEqual("Could not get server header param.");
                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const health = require("../../../../test/data/api/system/health/get-health-response.json");

            request.respondWith({
                status: 200,
                responseText: JSON.stringify(health)
            });

            expect(request.url).toBe("http://localhost:3333/health");

            expect(request.method).toEqual("GET");

        });

        it("should return throw an error if the header server param is invalid", done => {

            knoraApiConnection.system.healthEndpoint.getHealthStatus().subscribe(
                (response: ApiResponseData<HealthResponse>) => {},
                (err: ApiResponseError) => {
                    expect(err.error instanceof Error).toBeTruthy();
                    expect((err.error as Error).message).toEqual("Could not parse server header param webapi/v13.0.0-rc.16-11-ga88d20d.");
                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const health = require("../../../../test/data/api/system/health/get-health-response.json");

            request.respondWith({
                status: 200,
                responseText: JSON.stringify(health),
                responseHeaders: {
                    server: "webapi/v13.0.0-rc.16-11-ga88d20d" // akka part is missing
                }
            });

            expect(request.url).toBe("http://localhost:3333/health");

            expect(request.method).toEqual("GET");

        });

    });

});