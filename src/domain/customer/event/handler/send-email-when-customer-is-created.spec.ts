import EventDispatcher from "../../../@shared/event/event-dispatcher";
import Customer from "../../entity/customer";
import CustomerCreatedEvent from "../customer-created.event";
import SendEmailWhenCustomerIsCreatedHandler from "./send-email-when-customer-is-created.handler";

describe("SendEmailWhenCustomerIsCreatedHandler", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("should send email when creating a customer", () => {
    const customer = new Customer("1", "John");
    const event = new CustomerCreatedEvent(customer);

    const eventDispatcher = new EventDispatcher();
    const handler = new SendEmailWhenCustomerIsCreatedHandler();
    const spy = jest.spyOn(handler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", handler);
    eventDispatcher.notify(event);

    expect(spy).toHaveBeenCalledWith(event);
    expect(console.log).toHaveBeenCalledWith(
      `Esse é o primeiro console.log do evento: CustomerCreated`
    );
  });
});
