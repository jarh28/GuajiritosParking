# GuajiritosParking

Rest API for a small parking application.

1. Use `curl -X POST http://localhost:3000/ms-auth/login -H "Content-type: application/json" -d '{"user": "guajirito", "pass": "123"}'` to get authentication token and save it.

2. Enroll a new official vehicle `curl -X POST http://localhost:3000/ms-core/vehicles/enroll/official -H "Content-type: application/json" -H "authorization: Bearer $token" -d '{"plate": "S1234A"}'`. Trying to insert a vehicle with an already existing plate will result on an internal server error response.

3. Enroll a new resident vehicle `curl -X POST http://localhost:3000/ms-core/vehicles/enroll/resident -H "Content-type: application/json" -H "authorization: Bearer $token" -d '{"plate": "4567ABC"}'`. Trying to insert a vehicle with an empty plate will result on an internal server error response.

4. Register entry date for a vehicle `curl -X PATCH http://localhost:3000/ms-core/vehicles/entry -H "Content-type: application/json" -H "authorization: Bearer $token" -d '{"plate": "S1234A"}'`. Trying to register a vehicle previously registered will result into an error.

5. Dispatch a vehicle from parking `curl -X PATCH http://localhost:3000/ms-core/vehicles/leaving -H "Content-type: application/json" -H "authorization: Bearer $token" -d '{"plate": "S1234A"}'`. Trying to dispatch a vehicle not previously parked will result into an error.

6. Restart payment amount for resident vehicles and stay register for official vehicles `curl -X PATCH http://localhost:3000/ms-core/vehicles/start-month/ -H "authorization: Bearer $token"`.

7. Generate payment report for resident vehicles `curl http://localhost:3000/ms-core/vehicles/payment-report/ -H "authorization: Bearer $token" > payment-report.csv`.

Note: You may need to change IP address and port in order to properly use your MongoDB service. See `config.js` file.
