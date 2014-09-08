0 @${id}@ INDI
1 NAME ${ind.firstName} /${ind.lastName}/
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
<% if(fam.famc){ %>
1 FAMC @${fam.famc}@
<%  } %>
<% if(fam.fams){ %>
1 FAMS @${fam.fams}@
<%  } %>