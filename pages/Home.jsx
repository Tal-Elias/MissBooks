import { ToggleButton } from "../cmps/ToggleButton.jsx";

const { useState, useEffect } = React

export function Home() {

    const [isOn, setIsOn] = useState(false)

    return (
        <section className="home">
            <h1>Books for Everyone!</h1>
            <ToggleButton val={isOn} setVal={setIsOn} />
            {isOn && <img src="assets/img/home.jpg" alt="" />}
        </section>
    )
}