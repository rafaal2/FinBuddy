let currentUser = null;
let selectedFormattedDate = null;
const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
      let className =
        i === date.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()
          ? ' class="today"'
          : "";
      datesHtml += `<li${className}>${i}</li>`;
    }

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;

  const datesList = document.querySelectorAll('.dates li');
  datesList.forEach(dateElement => {
      dateElement.addEventListener('click', function() {
          const selectedDate = parseInt(this.textContent);
          const formattedMonth = month < 9 ? '0' + (month + 1) : month + 1; // Corrigir índice do mês
          const formattedDate = `${year}-${formattedMonth}-${selectedDate < 10 ? '0' + selectedDate : selectedDate}`;
          selectedFormattedDate = formattedDate;
      });
  });
}


navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
    displayExpensesCalendar(currentUser.id);
  });
});
renderCalendar();
const datesList = document.querySelectorAll('.dates li');

datesList.forEach(dateElement => {
    dateElement.addEventListener('click', function() {
        const selectedDate = this.textContent;
        const currentMonth = month + 1;
        const formattedDate = `${year}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${selectedDate < 10 ? '0' + selectedDate : selectedDate}`;
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const seeExp = document.getElementById('see-expense');
    const seeDisplayDiv = document.querySelector('.see-display');

    seeExp.addEventListener('click', function() {
        seeDisplayDiv.classList.toggle('hidden');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addExpenseButton = document.getElementById('add-expense');
    const hiddenForm = document.querySelector('.hidden-Form');

    addExpenseButton.addEventListener('click', function() {
        hiddenForm.classList.toggle('hidden');
        renderCalendar();
        displayExpensesCalendar(currentUser.id);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('register-button');
    const addUserForm = document.querySelector('.add-user');

    registerButton.addEventListener('click', function() {
        addUserForm.classList.remove('hidden');
    });
});
 document.addEventListener('DOMContentLoaded', () => {
     const adduserbtn = document.getElementById('add-userbtn');

     adduserbtn.addEventListener('click', function() {
         const nameInput = document.getElementById('logname').value;
         const monthBalanceInput = document.getElementById('monthbalance').value;
         const balanceInput = document.getElementById('balance').value;
         adduser(nameInput, monthBalanceInput, balanceInput)
     });});

     document.addEventListener('DOMContentLoaded', () => {
         const removeExpenseButton = document.getElementById('remove-expense');
         const deleteExpenseForm = document.querySelector('.delete-expense');

         removeExpenseButton.addEventListener('click', function() {
             deleteExpenseForm.classList.toggle('hidden');
         });

         const deleteButton = document.getElementById('delete-button');
         deleteButton.addEventListener('click', function() {
             const expenseName = document.getElementById('nameDel').value;
             deleteExpenseByName(expenseName);
             deleteExpenseForm.classList.add('hidden');
         });
     });


 document.addEventListener('DOMContentLoaded', () => {
     const loginButton = document.getElementById('login-button');
     const nomeInput = document.getElementById('nome');

     loginButton.addEventListener('click', function() {
         const userName = nomeInput.value;
         verify(userName);
         displaydata(userName)
     });
     loginButton.addEventListener('click', function() {
          const userName = nomeInput.value;
          verify(userName);
          displaydata(userName);
          fetch(`http://localhost:8080/user/${userName}`)
              .then(response => response.json())
              .then(user => {
                  const userId = user.id;
                  displayExpenses(userId);
                  displayExpensesCalendar(userId)
              })
              .catch(error => console.error('Erro:', error));
      });
 });
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', function() {
        if (selectedFormattedDate && currentUser) {
            const addUserForm = document.querySelector('.hidden-Form');
            const name = document.getElementById('name').value;
            const price = document.getElementById('price').value;
            addExpense(name, price, selectedFormattedDate, currentUser)
                .then(() => {
                    displayExpenses(currentUser.id);
                    displaydata(currentUser.name);
                    addUserForm.classList.add('hidden');
                })
                .catch(error => console.error('Erro:', error));
        } else {
            console.error('No date is selected or no user is logged in.');
        }
    });
});

 function verify(name) {
     return fetch(`http://localhost:8080/user/exists/${name}`)
         .then(response => response.json())
         .then(data => {
             if (data === true) {
                 return fetch(`http://localhost:8080/user/${name}`)
                     .then(response => response.json());
             } else {
                 throw new Error('User not found');
             }
         })
         .then(user => {
             if (user) {
                 const loginContainer = document.querySelector('.login-container');
                 const registerContainer = document.querySelector('.register-container');
                 const otherElements = document.querySelectorAll('.calendar, .top-right, .options');

                 loginContainer.classList.add('hidden');
                 registerContainer.classList.add('hidden');
                 otherElements.forEach(element => element.classList.remove('hidden'));
             }
             return user;
         })
         .catch(error => {
             console.error('Error:', error);
             return null;
         });
 }


 function displaydata(name) {
     verify(name)
         .then(user => {
             if (user) {
                 const userDiv = document.createElement('div');
                 userDiv.innerHTML =
                     `Name: ${user.name}
                      <br>
                      Month Balance: ${user.monthBalance}R$
                      <br>
                      Balance: ${user.balance}R$`;
                 const topRightDiv = document.querySelector('.top-right');
                 const hiddenDiv = document.querySelector('.hidden');
                 topRightDiv.innerHTML = '';
                 topRightDiv.appendChild(userDiv);
                 currentUser = user;
             }
         })
         .catch(error => console.error('Error:', error));
 }

function displayExpenses(id) {
    fetch(`http://localhost:8080/expense/find/${id}`)
        .then(response => response.json())
        .then(expenses => {
            const seeDisplayDiv = document.querySelector('.see-display');
            seeDisplayDiv.innerHTML = '';

            const table = document.createElement('table');
            table.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Price (R$)</th>
                    <th>Date</th>
                </tr>
            `;
            expenses.forEach(expense => {
                const expenseDate = new Date(expense.date);
                const formattedDate = `${('0' + (expenseDate.getDate() + 1)).slice(-2)}/${('0' + (expenseDate.getMonth() + 1)).slice(-2)}/${expenseDate.getFullYear()}`;
                const row = table.insertRow(-1);
                row.innerHTML = `
                    <td>${expense.name}</td>
                    <td>${expense.price}</td>
                    <td>${formattedDate}</td>
                `;
            });

            seeDisplayDiv.appendChild(table);
        })
        .catch(error => console.error('Error:', error));
}
function addExpense(name, price, date, user) {
    const expenseInfo = {
        name: name,
        price: price,
        date: date,
        userId: {
            name: user.name,
            balance: user.balance,
            monthBalance: user.monthBalance,
            id: user.id
        }
    };

    return fetch('http://localhost:8080/expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseInfo)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error('Erro ao criar a despesa: ' + data);
            });
        }
    })
    .then(() => {
        return fetch(`http://localhost:8080/user/${user.name}`);
    })
    .then(response => response.json())
    .then(user => {
        if (user) {
            currentUser = user;
            updateBalanceDisplay(currentUser.balance);
            renderCalendar();
            displayExpensesCalendar(currentUser.id);
        }
    });
}


 function adduser(name, monthBalance, balance) {
      const userData = {
          name: name,
          monthBalance: monthBalance,
          balance: balance
      };

      fetch('http://localhost:8080/user', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
      })
      .then(response => {
          if (response.ok) {
              document.querySelector('.add-user').classList.add('hidden');
              document.querySelector('.success-message').classList.remove('hidden');
              setTimeout(() => {
                  document.querySelector('.success-message').classList.add('hidden');
              }, 3000);
          } else {
              console.error('Erro ao criar o usuário:', response.statusText);
          }
      })
      .catch(error => console.error('Erro:', error));
  }
 function displayExpensesCalendar(id) {
     fetch(`http://localhost:8080/expense/find/${id}`)
         .then(response => response.json())
         .then(expenses => {
             const datesList = document.querySelectorAll('.dates li');
             datesList.forEach(dateElement => {
                 dateElement.classList.remove('has-expense');
             });

             expenses.forEach(expense => {
                 const expenseDate = new Date(expense.date);
                 const day = expenseDate.getDate() + 1;
                 const currentMonth = month;
                 const currentYear = year;
                 if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
                     const datesList = document.querySelectorAll('.dates li');
                     datesList.forEach(dateElement => {
                         if (parseInt(dateElement.textContent) === day && !dateElement.classList.contains('inactive')) {
                             dateElement.classList.add('has-expense');
                             dateElement.addEventListener('mouseenter', function() {
                                 displayExpenseName(this, expense.name);
                             });

                             dateElement.addEventListener('mouseleave', function() {
                                 removeExpenseName();
                             });
                         }
                     });
                 }
             });
         })
         .catch(error => console.error('Error:', error));
 }



  function displayExpenseName(element, expenseName) {
     const balloon = document.createElement('div');
     balloon.classList.add('balloon');
     balloon.textContent = expenseName;
     const rect = element.getBoundingClientRect();
     const xPos = rect.left + window.pageXOffset;
     const yPos = rect.top + window.pageYOffset;
     balloon.style.left = `${xPos}px`;
     balloon.style.top = `${yPos - 30}px`;
     document.body.appendChild(balloon);
   }


   function removeExpenseName() {

     removeTimeout = setTimeout(() => {
       const balloon = document.querySelector('.balloon');
       if (balloon) {
         balloon.remove();
       }
     });
   }
   function updateBalanceDisplay(balance) {
     const balanceDisplay = document.getElementById('balance-display');
     if (balanceDisplay) {
       balanceDisplay.textContent = `Balance: ${balance}R$`;
     }
   }
   function deleteExpenseByName(name) {
       fetch(`http://localhost:8080/expense/delete/${name}`, {
           method: 'DELETE'
       })
       .then(response => {
           if (response.ok) {

               renderCalendar();
               displayExpensesCalendar(currentUser.id);
               displayExpenses(currentUser.id);
           } else {
               console.error('Erro ao deletar despesa:', response.statusText);
           }
       })
       .catch(error => console.error('Erro:', error));
   }




