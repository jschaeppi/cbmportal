function search() {
    const searchText = document.getElementById('searchbox').value;
    console.log('https://admin.cbmportal.com/admin/dashboard?form=bonus&searchtext='+searchText);
  fetch('https://admin.cbmportal.com/admin/dashboard?form=bonus&searchtext='+searchText);
  }

  function selectForm() {
    const formName = document.getElementById('formSelect').value;
    location.href="../admin/dashboard/?formPage=" + formName + ">";
  }

module.exports = search();