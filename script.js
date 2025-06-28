    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('pid');
    const listView = document.getElementById('list-view');
    const detailView = document.getElementById('detail-view');

    if (id) {
      // Show Product Detail
      listView.style.display = 'none';
      detailView.style.display = 'block';
      fetch('https://dummyjson.com/products/' + id)
        .then(res => res.json())
        .then(data => {
          document.getElementById("pname").innerText = data.brand;
          document.getElementById("pimg").src = data.images[0];
          document.getElementById("cat").innerText = data.category;
          document.getElementById("desc").innerText = data.description;
          document.getElementById("price").innerText = "Rs. " + Math.round(data.price);
        });
    } else {
      // Show Product List
      const btn = document.getElementById("btn");
      const result = document.getElementById('result');

      function getData(){
        fetch('https://dummyjson.com/products?limit=500')
          .then(res => res.json())
          .then(data => {
            result.innerHTML = '';
            data.products.forEach(item => {
              let col = document.createElement("div");
              col.className = "col-md-4 col-sm-6 mb-4";
              col.innerHTML = `
                <div class="card h-100">
                  <img src="${item.images[0] ? item.images[0] : 'https://via.placeholder.com/300'}" class="card-img-top" style="height:300px;width:300px;">
                  <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text"><strong>Price:</strong> ₹${item.price}</p>
                    <button class="btn btn-info btn-sm view-btn" data-id="${item.id}">View Details</button>
                  </div>
                </div>
              `;
              result.appendChild(col);
            });

            Array.from(document.getElementsByClassName("view-btn")).forEach(btn => {
              btn.addEventListener("click", function(){
                let id = btn.getAttribute('data-id');
                window.location.search = '?pid=' + id;
              });
            });
          });
      }

      getData();
      btn.addEventListener("click", getData);
    }

    function goBack() {
      window.location.href = window.location.pathname;
    }