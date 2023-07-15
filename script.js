function getMenu() {
    fetch('menu.json')
      .then(response => response.json())
      .then(data => {
        const menuItems = document.getElementById('menuItems');
        data.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item.name;
          menuItems.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
      });
  }
  
  function takeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const burgers = ['Cheeseburger', 'Veggie Burger', 'Chicken Burger'];
        const order = {
          burgers: burgers.sort(() => Math.random() - 0.5).slice(0, 3)
        };
        resolve(order);
      }, 2500);
    });
  }
  
  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        const orderStatus = { order_status: true, paid: false };
        resolve(orderStatus);
      }, 1500);
    });
  }
  
  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const orderStatus = { order_status: true, paid: true };
        resolve(orderStatus);
      }, 1000);
    });
  }
  
  function thankyouFnc() {
    alert('Thank you for eating with us today!');
  }
  
  function startOrderProcess() {
    getMenu();
    const orderButton = document.getElementById('orderButton');
    orderButton.addEventListener('click', () => {
      orderButton.disabled = true;
      takeOrder()
        .then(order => {
          document.getElementById('preparation').style.display = 'block';
          document.getElementById('preparationStatus').textContent = 'Order in preparation: ' + order.burgers.join(', ');
          return orderPrep();
        })
        .then(orderStatus => {
          document.getElementById('preparationStatus').textContent = 'Order is ready for payment.';
          document.getElementById('payment').style.display = 'block';
          const payButton = document.getElementById('payButton');
          payButton.addEventListener('click', () => {
            payButton.disabled = true;
            payOrder()
              .then(orderStatus => {
                if (orderStatus.paid) {
                  document.getElementById('preparation').style.display = 'none';
                  document.getElementById('payment').style.display = 'none';
                  thankyouFnc();
                }
              });
          });
        });
    });
  }
  
  window.addEventListener('DOMContentLoaded', startOrderProcess);
  