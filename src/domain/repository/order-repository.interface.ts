import RepositoryInterface from "./repository-interface";
import Order from "../entity/order";

export default interface OrderRepositoryInteface
  extends RepositoryInterface<Order> {}
