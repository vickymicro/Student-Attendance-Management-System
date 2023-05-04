

function Dashboard() {
    return(
        <>
        <div className="content">
            <div className="container">
                <h5>Dashboard</h5>
                <form>
                    <label>Programme</label>
                    <select >
                       <option>Select Programme</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option> 
                    </select>

                    <label>Batch</label>
                    <select >
                       <option>Select Batch</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>

                    <label>Section</label>
                    <select >
                       <option>Select Section</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                    <br />
                    <label>Date</label>
                    <input type="date" />
                    <label>Day Order</label>
                    <input />
                    <input type="submit" />
                </form> 
                
            </div>
            
        </div>
         
        </>
    )
}

export default Dashboard;