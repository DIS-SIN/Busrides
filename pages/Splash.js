import {GCSplashScreen} from 'gc-tortilla';

export default function Splash() {
    return (
        <GCSplashScreen
            logo={{
                image: "https://d1em53b5kumigl.cloudfront.net/2019/09/Bus-Rides-Publication-Icon-1.png",
                altText: "Busrides Icon"
            }}
            backgroundImage={"https://d1em53b5kumigl.cloudfront.net/2019/11/Busrides-Home-Page-Image-Dark.jpg"}
            routes={{
                english: "/",
                french: "/fr"
            }}
        />
    );
}