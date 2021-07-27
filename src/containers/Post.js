import React from "react";
import { withRouteData } from "react-static";
import convert from "htmr";

import Attribution from "../components/Attribution";
import Divider from "../components/Divider";
import Image from "../components/Image";
import Kopy from "../components/Kopy";
import Link from "../components/Link";
import Random from "../components/Random";
import SmallCaps from "../components/SmallCaps";
import Stamp from "../components/Stamp";

const transform = {
	a: Link,
	attr: Attribution,
	del: SmallCaps,
	hr: Divider,
	kopy: Kopy,
	img: Image,
	random: Random,
	stamp: Stamp,
};

export default withRouteData(({ page }) => (
	<div>
		{convert(page.contents, { transform })}
		<hr className="end" />
	</div>
));
