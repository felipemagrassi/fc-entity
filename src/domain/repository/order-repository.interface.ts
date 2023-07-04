import RepositoryInterface from "./repository-interface";
import Order from "../entity/order";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Order> {}
