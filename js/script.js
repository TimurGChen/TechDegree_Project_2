/******************************************
Treehouse Techdegree:
project 2 - List Filter and Pagination

Please REJECT if this submission does not meet
all Exceeds Expectations Requirements, thank you.

******************************************/
const studentList = document.querySelector('ul.student-list').children;
const itemsPerPage = 10;
const pageDiv = document.querySelector('div.page');

//removes pagination links and 'no result' message
clearPagination = () => {
   if (document.querySelector('div.pagination')) pageDiv.removeChild(document.querySelector('div.pagination'));
   if (document.querySelector('h3#noResult')) pageDiv.removeChild(document.querySelector('h3#noResult'));
}

/*** 
the function displays a certain part of the list
accoridng to the page parameter and specified 
itemsPerPage
***/
showPage = (list, page) => {
   const startIndex = (page - 1)*itemsPerPage;
   const endIndex = page*itemsPerPage;
   for (let i=0; i<list.length; i++) {
      if ((i >= startIndex) && (i < endIndex)) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

/*** 
generates, appends pagination buttons, while
allowing each button to display a certain
section of the list
***/
appendPageLinks = list => {

   /**
    * creates an anchor with attributes needed for
    * styling and functionality
    */
   attributedAnchor = pageNumber => {
      const anchor = document.createElement('a');
      anchor.href = '#';
      anchor.textContent = pageNumber;
      if (pageNumber === 1) anchor.className = 'active';
      return anchor;
   }

   //resets active class when each anchor is clicked
   clickFunct = anchor => {
      const anchorList = linkUl.getElementsByTagName('a');
      for (let j=0; j<anchorList.length; j++) {
         anchorList[j].removeAttribute('class');
      }
      anchor.className = 'active';
      showPage(list, anchor.textContent);
   }

   clearPagination();

   const pageDiv = document.querySelector('div.page');
   const paginationDiv = document.createElement('div');
      paginationDiv.className = 'pagination';
   const linkUl = document.createElement('ul');
   let pageNumber = 1;

   paginationDiv.appendChild(linkUl);
   pageDiv.appendChild(paginationDiv);

   for (i = list.length; i > 0; i -= itemsPerPage) {
      const li = document.createElement('li');
      const anchor = attributedAnchor(pageNumber);
      anchor.addEventListener('click', (e) => {
         clickFunct(anchor);
      } )
      li.appendChild(anchor);
      linkUl.appendChild(li);
      pageNumber++;
   };
}

addSearchFunct = () => {
   //returns a list of matching items in studentList,
   //according to the input value; 
   search = (input) => {
      for (let i=0; i<studentList.length; i++) {
         const studentName = studentList[i].querySelector('h3').textContent;
         studentList[i].dataset.match = false;
         if ((input.value.length !== 0) && (studentName.toLowerCase().includes(input.value.toLowerCase()))) {
            studentList[i].dataset.match = true;
         }
      }
      const matchList = studentList[0].parentNode.querySelectorAll('li[data-match=true]');
      return matchList;
   }

   //response to users' action to the search box
   searchResponse = () => {
      for (let i=0; i<studentList.length; i++) {
         studentList[i].style.display = 'none';
      }
      const matchList = search(searchInput);
      if (matchList[0]) {
         showPage(matchList, 1);
         appendPageLinks(matchList);
      } else {
         if (searchInput.value.length !== 0) {
            clearPagination();
            const noResult = document.createElement('h3');
            noResult.id = 'noResult';
            noResult.textContent = 'No Result';
            pageDiv.appendChild(noResult);
         } else {
            showPage(studentList, 1);
            appendPageLinks(studentList);
         }
      }
   }

   attachListeners = () => {
      searchButton.addEventListener('click', (e) => {
         searchResponse();
      })
      searchInput.addEventListener('keyup', (e) => {
         searchResponse();
      })
      searchDiv.addEventListener('submit', (e) => {
         e.preventDefault();
         searchResponse();
      })
   }

   const headerDiv = document.querySelector('div.page-header');
   const searchDiv = document.createElement('div');
      searchDiv.className = 'student-search';
   const searchInput = document.createElement('input');
      searchInput.placeholder = 'Search for students...';
   const searchButton = document.createElement('button');
      searchButton.textContent = 'Search';

   attachListeners();

   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchButton);
   headerDiv.appendChild(searchDiv);
}

/**
 * initiates the site to start on the
 * first page
 */
showPage(studentList, 1);
appendPageLinks(studentList);
addSearchFunct();