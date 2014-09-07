0 HEAD
1 GEDC
2 VERS 5.5.1
1 CHAR UTF-8
0 @momsFam@ FAM
1 HUSB @momsDad@
1 WIFE @momsMom@
1 CHIL @mom@
0 @dadsFam@ FAM
1 HUSB @dadsDad@
1 WIFE @dadsMom@
1 CHIL @dad@
0 @fam@ FAM
1 HUSB @dad@
1 WIFE @mom@
1 CHIL @me@
<% for(var i=0; i<brothers.length; i++){ %>
1 CHIL @b${i+1}@
<%  } %>
