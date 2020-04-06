import React from 'react';
import { useHistory } from "react-router-dom";
import "./style.scss";

function Privacy(props) {
    let history = useHistory();
    return (
        <div className="privacy-page">
            <div style={{ marginTop: "25vh" }} />
            <section className="privacy-desc">
                <header>
                    Privacy Commitments
                </header>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
            </section>
        </div>
    )
}

export default Privacy;