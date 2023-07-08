import EventDispatcher from "../../../@shared/event/event-dispatcher";
import Customer from "../../entity/customer";
import CustomerCreatedEvent from "../customer-created.event";
import AddNewCustomerToThirdPartyApiHandler from "./add-new-customer-to-third-party-api.handler";

describe("Add new customer to third party API", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("should add when creating a customer", () => {
    const customer = new Customer("1", "John");
    const event = new CustomerCreatedEvent(customer);

    const eventDispatcher = new EventDispatcher();
    const handler = new AddNewCustomerToThirdPartyApiHandler();
    const spy = jest.spyOn(handler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", handler);
    eventDispatcher.notify(event);

    expect(spy).toHaveBeenCalledWith(event);
    expect(console.log).toHaveBeenCalledWith(
      `Esse é o segundo console.log do evento: CustomerCreated`
    );
  });
});
