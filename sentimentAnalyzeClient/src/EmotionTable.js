import React from 'react';

class EmotionTable extends React.Component {
    render() {
        //Returns the emotions as an HTML table
        return (
            <div class="pt-5">
                <table className="table table-hover table-responsive">
                    <thead class="table-dark">
                        <tr>
                            <th>Emotion</th>
                            <th>Confidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(this.props.emotions).map(
                            (mapentry) => {
                                return (
                                    <tr>
                                        <td>{mapentry[0]}</td>
                                        <td>{(mapentry[1]*100).toFixed(2) + '%'}</td>
                                    </tr>
                                );
                            }
                        )} 
                    </tbody>
                </table>
            </div>
        );
    }
}
export default EmotionTable;