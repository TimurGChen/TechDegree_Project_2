/******************************************
Treehouse Techdegree:
project 2 - List Filter and Pagination

Please REJECT if this submission does not meet
all Exceeds Expectations Requirements, thank you.

******************************************/
const studentList = document.querySelector('ul.student-list').children;
const itemsPerPage = 10;

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
   const pageDiv = document.querySelector('div.page');
   const paginationDiv = document.createElement('div');
   const linkUl = document.createElement('ul');
   let pageNumber = 1;

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

   //functionality when each anchor is clicked
   clickFunct = anchor => {
      const anchorList = linkUl.getElementsByTagName('a');
      for (let j=0; j<anchorList.length; j++) {
         anchorList[j].removeAttribute('class');
      }
      anchor.className = 'active';
      showPage(studentList, anchor.textContent);
   }

   paginationDiv.className = 'pagination';
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

addSearchBar() {
   const headerDiv = document.querySelector('div.page-header');
   const searchDiv = document.createElement('div');
   searchDiv.className = 'student-search';
   const input = document.createElement('input');
   input.placeholder = 'Search for students...';
   const button = document.createElement('button');
   button.textContent = 'Search';
   searchDiv.appendChild(input);
   searchDiv.appendChild(button);
   headerDiv.appendChild(searchDiv);
}

/**
 * initiates the site to start on the
 * first page
 */
addSearchBar();
showPage(studentList, 1);
appendPageLinks(studentList);