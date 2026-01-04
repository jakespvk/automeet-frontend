import { Subscription } from "@/types";
import EmbeddedStripeCheckout from "./embeddedStripeCheckout"

const Checkout = (props: { subscription: Subscription }) => {
  return (
    <div className="max-w-full sm:max-w-2/3 mt-24 mb-5 mx-5">
      <EmbeddedStripeCheckout subscription={props.subscription} />
    </div>
  )
}

export default Checkout;
