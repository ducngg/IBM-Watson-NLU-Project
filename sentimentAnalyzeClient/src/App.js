import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';

class App extends React.Component {
    /*
    We are setting the component as a state named innercomp.
    When this state is accessed, the HTML that is set as the 
    value of the state, will be returned. The initial input mode
    is set to text
    */
    state = {
        mode: "text",
        innercomp: 
            <div class="pt-5">
                Enter your text here for analyzing.<br/>
                <textarea rows={6} cols="50" id="textinput" />
            </div>,
        sentimentOutput: [],
        sentiment: true
    }
    /*
    This method returns the component based on what the input mode is.
    If the requested input mode is "text" it returns a textbox with 4 rows.
    If the requested input mode is "url" it returns a textbox with 1 row.
    */

    renderOutput = (input_mode) => {
        let rows = 1
        let mode = "url"
        //If the input mode is text make it 4 lines
        if (input_mode === "text") {
            mode = "text"
            rows = 6
        }
        this.setState({
            innercomp: 
                <div class="pt-5">
                    Enter your {mode === "text" ? "text" : "URL"} here for analyzing.<br/>
                    <textarea rows={rows} cols="50" id="textinput" />
                </div>
            ,
            mode: mode,
            sentimentOutput: [],
            sentiment: true
        });
    }

    sendForSentimentAnalysis = () => {
        this.setState({ sentiment: true });
        let url = "."; 
        let mode = this.state.mode
        url = url + "/" + mode + "/sentiment?" + mode + "=" + document.getElementById("textinput").value;

        fetch(url).then((response) => {
            console.log(response.status)
            if (response.status === 422) {
                this.setState({ sentimentOutput: 
                    <div class="alert alert-warning alert-dismissible fade show">
                        <button type="button" class="btn-close" dataBsDismiss="alert" ariaLabel="Close"></button>
                        <strong>Your input is either blank or invalid!</strong>
                    </div> 
                });
                return;
            }
            response.json().then((data) => {
                this.setState({ sentimentOutput: data.label });
                let output = data.label;
                let color = "white";
                switch (output) {
                    case "positive": color = "green"; break;
                    case "negative": color = "red"; break;
                    default: color = "yellow";
                }
                output = <div class="pt-5" style={{ color: color, fontSize: 20 }}>{output}</div>
                this.setState({ sentimentOutput: output });
            })
        });
    }

    sendForEmotionAnalysis = () => {

        this.setState({ sentiment: false });
        let url = ".";
        let mode = this.state.mode
        url = url + "/" + mode + "/emotion?" + mode + "=" + document.getElementById("textinput").value;

        fetch(url).then((response) => {
            console.log(response.status)
            if (response.status === 422) {
                this.setState({ sentimentOutput: 
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Your input is either blank or invalid!</strong>
                        <button type="button" class="btn-close" dataBsDismiss="alert" ariaLabel="Close"></button>
                    </div> 
                });
                return;
            }
            response.json().then((data) => {
                this.setState({ sentimentOutput: <EmotionTable emotions={data} /> });
            });
        });
    }


    render() {
        return (
            <div className="App">
                <div class="d-flex justify-content-center pt-5">
                    <button className="btn btn-outline-primary" onClick={() => { this.renderOutput('text') }}>Text</button>
                    <button className="btn btn-outline-primary" onClick={() => { this.renderOutput('url') }}>URL</button>
                </div>
               
                {this.state.innercomp}

                <div class="d-flex justify-content-center pt-5">
                    <button className="btn btn-outline-dark" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
                    <button className="btn btn-outline-dark" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
                </div>
              
                {this.state.sentimentOutput}
            </div>
        );
    }
}

export default App;
