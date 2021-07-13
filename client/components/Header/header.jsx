import { observer } from "mobx-react";
import Link from "next/link";

import cartStore from "../../stores/cartStore";

function Header() {
    return (
        <div className="container flex justify-between items-center h-20 ">
            <div>
                <Link href="/">
                    <a className="font-bold mb-6 text-purpled">
                        <span className="text-yellowish">E</span>
                        commerce
                    </a>
                </Link>
            </div>
            <div className="flex items-center">
                <Link href="/cart">
                    <div className="flex items-baseline">
                        <div className="z-0 flex cursor-pointer rounded-full w-10 h-10 bg-purpled-light justify-center items-center">
                            <i className="fa fa-shopping-cart text-purpled" />
                        </div>
                        <div className="z-10 relative -bottom-4 -left-4 flex cursor-pointer rounded-full w-4 h-4 bg-yellowish text-white text-xs justify-center items-center">
                            {cartStore.cart.length}
                        </div>
                    </div>
                </Link>
                <Link href="/admin">
                    <div className="flex cursor-pointer rounded-full w-10 h-10 bg-purpled-light justify-center items-center ml-4">
                        <i className="fa fa-user text-purpled" />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default observer(Header);
