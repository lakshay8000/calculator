import { useEffect, useRef, useState } from "react";
import "./calculator.css";

function Calculator() {

    const [value, setValue] = useState("0");

    function computeResult() {
        let valueToCompute = value;
        if (valueToCompute.includes("%")) {
            valueToCompute = valueToCompute.replace("%", "/100");
        }

        try {
            const result = eval(valueToCompute);
            setValue(result + "");
        }
        catch (error) {
            setValue("error");
        }
        
    }

    function reset() {
        setValue("0");
    }

    // made a single function to handle keypress and click of button-
    function handleKeyDown(key) {
        const pressedKey = key;
        let lastChar= value[value.length- 1];
        const numbersRegex= /[0-9().]+/;
        const operatorsRegex= /[-+/*%]/;
    
        if (
            pressedKey == "1" ||
            pressedKey == "2" ||
            pressedKey == "3" ||
            pressedKey == "4" ||
            pressedKey == "5" ||
            pressedKey == "6" ||
            pressedKey == "7" ||
            pressedKey == "8" ||
            pressedKey == "9" ||
            pressedKey == "0" ||
            pressedKey == "+" ||
            pressedKey == "-" ||
            pressedKey == "*" ||
            pressedKey == "/" ||
            pressedKey == "." ||
            pressedKey == "%" ||
            pressedKey == "(" ||
            pressedKey == ")" ||
            pressedKey == "Enter" ||
            pressedKey == "Escape" ||
            pressedKey == "Backspace"
        ) {
            if (value == "error") {
                setValue("0");
            }

            if (numbersRegex.test(pressedKey)) {
                setValue(prev => (prev == "0")? "" : prev);
                setValue(prev => prev + pressedKey);
            }
            else if (operatorsRegex.test(pressedKey)) {
                // if last char is an operator and current pressed key is also an operator-
                if (operatorsRegex.test(lastChar)) {
                    setValue(prev => prev.slice(0, -1) + pressedKey);
                }
                
                else if (pressedKey == "%") {
                    setValue(prev => prev + "/100");
                }
                else {
                    setValue(prev => prev + pressedKey);
                }
            }
            else if (pressedKey === "Enter") {
                computeResult();
            }
            else if (pressedKey === "Escape") {
                reset();
            }
            else if (pressedKey == "Backspace") {
                setValue(prev => prev.slice(0, -1));
            }
        }
    }

    const documentRef= useRef(null);
    useEffect(() => {
        documentRef.current.focus();
    }, [])


    return (
        <div 
            className="container-fluid app-wrapper d-flex flex-column justify-content-center align-items-center"
            onKeyDown={(e) => handleKeyDown(e.key)}
            tabIndex={-1}  /* It is mandatory to make onKeyUp work on a div */
            ref= {documentRef}
            onBlur={() => {
                documentRef.current.focus();
            }}
        >

            <h1 className="heading mb-4 text-white">Calculator</h1>

            <div className="calculator-wrapper d-flex flex-column justify-content-between align-items-center gap-2">

                <div
                    className="screen d-flex justify-content-end align-items-center mb-3"

                >
                    <span className="overflow-hidden" id="input-text">{value}</span>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <button onClick={(e) => handleKeyDown(e.target.textContent)} className="rounded-circle operators" id="opening-bracket">(</button>
                    <button onClick={(e) => handleKeyDown(e.target.textContent)} className="rounded-circle operators" id="closing-bracket">)</button>
                    <button onClick={(e) => handleKeyDown(e.target.textContent)} className="rounded-circle operators" id="percentage">%</button>
                    <button onClick={reset} className="rounded-circle operators" id="clear-button">AC</button>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <button onClick={(e) => handleKeyDown(e.target.textContent)} className="rounded-circle numbers" id="7">7</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle numbers" id="8">8</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle numbers" id="9">9</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle operators" id="divide-operator">/</button>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle numbers" id="4">4</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle numbers" id="5">5</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle numbers" id="6">6</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle operators" id="multiply-operator">*</button>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle numbers" id="1">1</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle numbers" id="2">2</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle numbers" id="3">3</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle operators" id="subtract-operator">-</button>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle numbers" id="0">0</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle bg-dark text-white" id="point">.</button>
                    <button onClick= {computeResult} className="rounded-circle equal-operator bg-dark text-white" id="equal-operator">=</button>
                    <button onClick= {(e) => handleKeyDown(e.target.textContent)} className="rounded-circle operators" id="add-operator"> + </button>
                </div>

            </div>
        </div>
    )
}

export default Calculator;