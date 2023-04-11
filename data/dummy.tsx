export default function PackData(id) {
    const data = {
        0: {
            id: 0,
            title: "",
            image: "",
        },
            1: {
                id: 1,
                title: "Premier",
                image: "/images/booster_art/Premier.png"
            },
            2: {
                id: 2,
                title: "Colosseum",
                image: "/images/booster_art/Colosseum.png"
            },
            3: {
                id: 3,
                title: "Lost Isle",
                image: "/images/booster_art/Lost_Isle.png"
            },
            4: {
                id: 4,
                title: "Laboratory",
                image: "/images/booster_art/Laboratory.png"
            },
            5: {
                id: 5,
                title: "Evolution",
                image: "/images/booster_art/Evolution.png"
            },
            6: {
                id: 6,
                title: "Assault",
                image: "/images/booster_art/Assault.png"
            },
            7: {
                id: 7,
                title: "Present",
                image: "/images/booster_art/Present.png"
            },
            8: {
                id: 8,
                title: "Flight",
                image: "/images/booster_art/Flight.png"
            },
            9: {
                id: 9,
                title: "Mystery",
                image: "/images/booster_art/Mystery.png"
            },
            10: {
                id: 10,
                title: "Legends",
                image: "/images/booster_art/Legends.png"
            }
        };

        return data[id];
}