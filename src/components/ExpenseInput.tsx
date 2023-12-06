import { useState, useRef } from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import CloseEditButton from './CloseEditButton';
import AddButton from './AddButton';
import CloseAddButton from './CloseAddButton';

import {
    Chart as ChartJS,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
} from 'chart.js';

import {Bar} from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
)

let expenseCat = [{
  category: 'Groceries',
  value: 0
},
{
  category: 'Eating Out',
  value: 0
},
{ 
  category: 'Health',
  value: 0
},
{
  category: 'Entertainment',
  value: 0
},
{
  category: 'Necessities',
  value: 0
},
{
  category: 'Bills',
  value: 0
},
{
  category: 'Others',
  value: 0
},
]

/*const options = {
  color: "#9e9e9e",
  scales:{
    x:{
      type: 'category',
      labels: expenseCat.map((cat) => cat.category),
      ticks: {
        color: "#9e9e9e"
      }
    },
    y: {
      ticks: {
        color: "#9e9e9e"
      }
    },
  },
}*/

function ExpenseInput() {
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);

  interface IExpenses {
    id: number,
    title: string,
    value: string,
    category: string
  }

  const expenses:  IExpenses[] = [];
  const expensesRef = useRef(expenses);

    const[userData, setUserData] = useState({
        labels: expenseCat.map((data) => data.category),
        datasets: [{
          label: "Expenses",
          data: expenseCat.map((data) => data.value),
          backgroundColor: "#9e9e9e"
        }]});

    function addExpense() {
      if ((document.getElementById('title') as HTMLInputElement).value !== '' && (document.getElementById('value') as HTMLInputElement).value !== '') {
        let expense = {
            id: Date.now(),
            title: (document.getElementById('title') as HTMLInputElement).value,
            value: (document.getElementById('value') as HTMLInputElement).value,
            category: (document.getElementById('category') as HTMLInputElement).value
        }
        expensesRef.current.push(expense);
        const valueIndex = expenseCat.findIndex(cat => cat.category === expense.category);
        expenseCat[valueIndex].value = expenseCat[valueIndex].value + Number(expense.value);
        setUserData(({
          labels: expenseCat.map((data) => data.category),
          datasets: [{
            label: "Expenses",
            data: expenseCat.map((data) => data.value),
            backgroundColor: "#9e9e9e"
          }]}));
        (document.getElementById('title') as HTMLInputElement).value = '';
        (document.getElementById('value') as HTMLInputElement).value = '';
        (document.getElementById('category') as HTMLInputElement).value = 'Groceries';
        setAddMode(false);
      }
    }

    function deleteExpense(id: number) {
      const eID = expensesRef.current.findIndex(expense => expense.id === id);
      const category = expensesRef.current[eID].category;
      const catID = expenseCat.findIndex(cat => cat.category === category);
      expenseCat[catID].value -= Number(expensesRef.current[eID].value);
      expensesRef.current.splice(eID, 1);
      setUserData(({
        labels: expenseCat.map((data) => data.category),
        datasets: [{
          label: "Expenses",
          data: expenseCat.map((data) => data.value),
          backgroundColor: "#9e9e9e"
        }]}));
    }

    function openEdit() {
      setEditMode(true);
      setAddMode(false);
    }

    function closeEdit() {
      setEditMode(false);
    }

    function openAdd() {
      setAddMode(true);
      setEditMode(false);
    }

    function closeAdd() {
      setAddMode(false);
    }

    //Adding lists of expenses by categories

    const grocieriesList = expensesRef.current.filter((expense) => expense.category === "Groceries")

    const grocieries =  grocieriesList.map((expense) => (
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
          <p key={expense.id} className="expenseItemName">
            {expense.title} <br/>{expense.value}
          </p>
          </div>
        {editMode ? <div className="col"><DeleteButton onClick = {() => deleteExpense(expense.id)}/></div> : null}
        </div>
      </div>
    ));

    const eatingOutList = expensesRef.current.filter((expense) => expense.category === "Eating Out")

    const eatingOut =  eatingOutList.map((expense) => (
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
          <p key={expense.id} className="expenseItemName">
            {expense.title} <br/>{expense.value}
          </p>
          </div>
        {editMode ? <div className="col"><DeleteButton onClick = {() => deleteExpense(expense.id)}/></div> : null}
        </div>
      </div>
    ));

    const healthList = expensesRef.current.filter((expense) => expense.category === "Health")

    const health =  healthList.map((expense) => (
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
          <p key={expense.id} className="expenseItemName">
            {expense.title} <br/>{expense.value}
          </p>
          </div>
        {editMode ? <div className="col"><DeleteButton onClick = {() => deleteExpense(expense.id)}/></div> : null}
        </div>
      </div>
    ));

    const entertainmentList = expensesRef.current.filter((expense) => expense.category === "Entertainment")

    const entertainment =  entertainmentList.map((expense) => (
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
          <p key={expense.id} className="expenseItemName">
            {expense.title} <br/>{expense.value}
          </p>
          </div>
        {editMode ? <div className="col"><DeleteButton onClick = {() => deleteExpense(expense.id)}/></div> : null}
        </div>
      </div>
    ));

    const necessitiesList = expensesRef.current.filter((expense) => expense.category === "Necessities")

    const necessities =  necessitiesList.map((expense) => (
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
          <p key={expense.id} className="expenseItemName">
            {expense.title} <br/>{expense.value}
          </p>
          </div>
        {editMode ? <div className="col"><DeleteButton onClick = {() => deleteExpense(expense.id)}/></div> : null}
        </div>
      </div>
    ));
    
    const billsList = expensesRef.current.filter((expense) => expense.category === "Bills")

    const bills =  billsList.map((expense) => (
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
          <p key={expense.id} className="expenseItemName">
            {expense.title} <br/>{expense.value}
          </p>
          </div>
        {editMode ? <div className="col"><DeleteButton onClick = {() => deleteExpense(expense.id)}/></div> : null}
        </div>
      </div>
    ));

    const othersList = expensesRef.current.filter((expense) => expense.category === "Others")

    const others =  othersList.map((expense) => (
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
          <p key={expense.id} className="expenseItemName">
            {expense.title} <br/>{expense.value}
          </p>
          </div>
        {editMode ? <div className="col"><DeleteButton onClick = {() => deleteExpense(expense.id)}/></div> : null}
        </div>
      </div>
    ));

  var catMap = new Map();
  
  let sum = 0;

  expenseCat.forEach(expense => {
    catMap.set(expense.category, expense.value);
    sum += expense.value;
  });

    return (
    <main>
      <div className="container text-center">
      <div className="row align-items-start">
      <div className="col">
        <div>
          {addMode? <CloseAddButton onClick={closeAdd}/> : <AddButton onClick={openAdd}/>}
        </div>
        {addMode?
          <div id="formBox">
            <form>
                <div className="form-floating mb-2">
                    <input type="text" className="form-control" id="title" placeholder="Title"/>
                    <label className="form-label">Title</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="number" className="form-control" id="value" placeholder="Value"/>
                    <label className="form-label">Amount</label>
                </div>
                <div className="formBox" >
                    <select name="category" id="category" className="form-select form-select-lg mb-2">
                      <option value="Groceries">Groceries</option>
                      <option value="Eating Out">Eating Out</option>
                      <option value="Health">Health</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Necessities">Necessities</option>
                      <option value="Bills">Bills</option>
                      <option value="Others">Others</option>
                    </select>
                </div>
                <div className="formBox">
                    <button type="button" onClick={addExpense} id="btn" className="btn btn-light btn-lg btn-block">Add</button>
                </div>
            </form>
          </div>
          : null }
        </div>
        <div className="col" id="total">
          <h1>Total</h1>
          <h1>{sum}</h1>
        </div>
        <div className="col" id="edit">
          {editMode ? <CloseEditButton onClick={closeEdit}/> : <EditButton onClick={openEdit}/>}
        </div>
      </div>
      </div>
      <div className="container text-center">
        <div className="row align-items-start">
            <div className="charts">
              <div className="barChart">
                <Bar data={userData}/>
              </div>
            </div>
          <div className="containter text-center">
            <div className="row align-items-start">
              <div className="col">
                <h4>Groceries</h4>
                <h5>{catMap.get('Groceries')}</h5>
                <hr/>
                {grocieries}
              </div>
              <div className="col">
                <h4>Eating Out</h4>
                <h5>{catMap.get('Eating Out')}</h5>
                <hr/>
                {eatingOut}
              </div>
              <div className="col">
                <h4>Health</h4>
                <h5>{catMap.get('Health')}</h5>
                <hr/>
                {health}
              </div>
              <div className="col">
                <h4>Entertainment</h4>
                <h5>{catMap.get('Entertainment')}</h5>
                <hr/>
                {entertainment}
              </div>
              <div className="col">
                <h4>Necessities</h4>
                <h5>{catMap.get('Necessities')}</h5>
                <hr/>
                {necessities}
              </div>
              <div className="col">
                <h4>Bills</h4>
                <h5>{catMap.get('Bills')}</h5>
                <hr/>
                {bills}
              </div>
              <div className="col">
                <h4>Others</h4>
                <h5>{catMap.get('Others')}</h5>
                <hr/>
                {others}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    )
}
  export default ExpenseInput;
  