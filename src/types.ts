export type Subscription = {
  price: Number;
  columnLimit: Number;
  rowLimit: Number;
  pollFrequency: "Weekly" | "Daily";
}
