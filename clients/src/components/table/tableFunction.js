export function generateCellHead(object, headers){
  var CellHeader = []
  var i = 0
  for (let header of headers) {
          var temp = {
          id : i,
          //isNumeric: !isNaN(object[header]),
          isNumeric: false,
          disablePadding : i===0 ? true : false,
          label: header
          }
          CellHeader.push(temp)
          i++
  } 
  return CellHeader
}
//Sort
export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
export function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}