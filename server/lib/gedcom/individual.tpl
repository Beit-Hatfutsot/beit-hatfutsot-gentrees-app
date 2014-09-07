0 @${id}@ INDI
1 GIVN ${ind.firstName}
1 SURN ${ind.lastName}
<% if(ind.email){ %>
1 EMAIL ${ind.email}
<%  } %>
1 SEX ${ind.isMale ? 'M' : 'F'}
1 BIRT
2 DATE ${ind.dateOfBirth}
2 PLAC ${ind.placeOfBirth}
<% if(ind.dateOfDeath){ %>
1 DEAT
2 DATE ${ind.dateOfDeath}
<%  } %>
<% if(fam.famcId){ %>
1 FAMC @{fam.famcId}@
<%  } %>
<% if(fam.famsId){ %>
1 FAMC @{fam.famsId}@
<%  } %>