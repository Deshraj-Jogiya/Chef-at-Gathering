import React, { useEffect, useState } from "react";
import DietItem from "./DietOfferItem"

function DietOffer(props) {
    const [diets, setDiets] = useState([])

    const updateDiets = async () => {
        let data = await fetch(`${process.env.REACT_APP_BASE_URL}general/categories`);
        let parsedData = await data.json()
        setDiets(parsedData.data)
    }
    useEffect(() => {
        updateDiets();
        // eslint-disable-next-line
    }, [])
    return (
        <div className="container my-5" id="diet-offer">
            <h3 className="text-center">Diet & Cuisines we offer</h3>
            <div className="py-5 row row-cols-md-5 row-cols-sm-2 d-flex justify-content-center">
                {
                    diets.map((element, index) => {
                        return <DietItem key={index} data={element} />
                    })
                }
            </div>
        </div>
    );
}

export default DietOffer;
