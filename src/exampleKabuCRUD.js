    // let appURL = "{{env('APP_URL')}}"; //App url
    // let appURL = 'http://localhost/KabuCrud/public/CRUD';
    let selectedId = -1;    //Id of de object selected
    let currentPage = -1;   //Current page number
    let TableInformation = null;    //Table´s information
    let searchValue = "";   //Search parameter value

    window.onload = function() 
    {

        getDatas(crudTable,1);

    }

    function modifyCRUD(table)
    {
        let xhr = new XMLHttpRequest();
        let parameter="";
        for(let i=1;i<TableInformation.length;i++)
        {
            parameter+=document.getElementById("modify"+TableInformation[i].COLUMN_NAME+selectedId).name;
            if(document.getElementById("modify"+TableInformation[i].COLUMN_NAME+selectedId).type=="checkbox")
            {
                if(document.getElementById("modify"+TableInformation[i].COLUMN_NAME+selectedId).checked)
                    parameter+= "=1";
                else
                    parameter+= "=0";       
            }
            else
            {
                parameter+= "=" + document.getElementById("modify"+TableInformation[i].COLUMN_NAME+selectedId).value;    
            }
            
            if(i!=(TableInformation.length-1))
            {
                parameter+="&";
            }
        }

        var url=appURL+"/"+table+"/"+selectedId+"?"+parameter;

        xhr.onreadystatechange = function()
        {
            if(this.readyState==4 && this.status == 200)
            {
                if(searchValue=="")
                    getDatas(table,currentPage);
                else
                    searchData(table,currentPage);
                if(renderAlert)
                {
                //Change alert
                html ="";
                html += '<div class="alert alert-success" role="alert" alert-dismissible fade show>';
                html += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
                html += 'Successfully modified the '+ table +' column.';
                html += '</div>';
                document.getElementById('alert').innerHTML=html;
                //end alert
                }
            }
        }

        xhr.open('PUT',url,true);

        xhr.send();

    }
    function deleteCRUD(table)
    {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function()
        {
            if(this.readyState==4 && this.status == 200)
            {
                getDatas(table,1);
                if(renderAlert)
                {
                    //Change alert
                    html ="";
                    html += '<div class="alert alert-dark" role="alert" alert-dismissible fade show>';
                    html += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
                    html += 'Successfully deleted the '+ table +' column.';
                    html += '</div>';
                    document.getElementById('alert').innerHTML=html;
                    //end alert
                }
            }
            else
            {
                console.log("Mal");
            }
        }
        
        xhr.open('DELETE',appURL+"/"+table+"/"+selectedId,true);

        xhr.send();
    }


    function searchData(table,page)
    {
        searchValue=document.getElementById("seeker").value;

        //Si no hay nada en el buscador, pues devolvemos todo.
        if(searchValue=="")
        {
            getDatas(table,1);
            return;
        }

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function()
        {
            if(this.readyState==4 && this.status == 200)
            {
                let result = JSON.parse(xhr.response);
                let html = "";

                currentPage=result.current_page;

                if(renderTable)
                {

                //Change body
                html += '<table class="table table-hover mb-5">';
                html += '<thead class="thead-dark">';
                html += '<tr>';

                for(let i=0;i<result.TBinfo.length;i++)
                {
                    if(i==0)
                        html += '<th scope="col" onclick="sortSearchData(\'id\');" >#</th>';
                    else  //onclick="sortData(this.innerHTML);" title="Sort the table by ' + result.TBinfo[i].COLUMN_NAME + '
                        html += '<th scope="col" onclick="sortSearchData(this.innerHTML);"  >'+ result.TBinfo[i].COLUMN_NAME +'</th>';
                }

                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                for(let i=0;i<result.data.length;i++)
                {
                    html += '<tr  data-toggle="modal" onclick="selectedId='+result.data[i].id+'" data-target="#modifyModal'+ result.data[i].id +'">';
                    for(let j=0;j<result.TBinfo.length;j++)
                    {
                        
                        // let TBinfoAux = result.TBinfo[j].COLUMN_NAME;
                        if(j==0)
                        {
                            html += '<th scope="row">' + result.data[i][result.TBinfo[j].COLUMN_NAME] + '</th>';
                        }
                        else
                        {
                            html += '<td>' + result.data[i][result.TBinfo[j].COLUMN_NAME] + '</td>';
                        }
                    }
                    html += '</tr>';
                }               

                html += '</tbody>';
                html += '</table>';

                //Modal modify for
                for(let i=0;i<result.data.length;i++)
                {
                //Modify table modal

                html += '<div class="modal fade" id="modifyModal'+ result.data[i].id +'">';
                html += '<div class="modal-dialog">';
                html += '<div class="modal-content">';
      
                // Modal Header 
                html += '<div class="modal-header">';
                html += '<h4 class="modal-title">Modify '+ result.table +' </h4>';
                html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
                html += '</div>';
        
                //Modal body
                html += '<div class="modal-body" id="modifyModalBody">';
                
                for(let j = 1;j < result.TBinfo.length ;j++)
                {
                    html += '<div class="container">';
                    html += '<label for="createNombre'+ result.TBinfo[j].COLUMN_NAME +'">' + result.TBinfo[j].COLUMN_NAME + '</label>';

                    html += '<input type=' ;

                    switch(result.TBinfo[j].DATA_TYPE)
                    {
                        case "int":
                            html += "'number'";
                        break;
                        case "varchar":
                            html += "'text'";
                        break;
                        case "date":
                            html += "'date'";
                        break;
                        case "text":
                            html += "'text'";
                        break;
                        case "tinyint":
                            html += "'checkbox'";
                            if(result.data[i][result.TBinfo[j].COLUMN_NAME]==1)
                                html += " checked ";
                        break;
                        case "smallint":
                            html += "'number' step='any'";
                        break;
                        case "mediumint":
                            html += "'number' step='any'";
                        break;
                        case "bigint":
                            html += "'number'";
                        break;
                        case "decimal":
                            html += "'number' step='any'";
                        break;
                        case "double":
                            html += "'number' step='any'";
                        break;
                        case "real":
                            html += "'number' step='any'";
                        break;
                        case "datetime":
                            html += "'date'";
                        break;
                        case "timestamp":
                            html += "'datetime-local'";
                        break;
                        case "time":
                            html += "'time'";
                        break;
                        case "year":
                            html += "'number' step='1' min='1901' max='2155' ";
                        break;
                        case "char":
                            html += "'text'";
                        break;
                        case "tinytext":
                            html += "'text'";
                        break;
                        case "mediumtext":
                            html += "'text'";
                        break;
                        case "longtext":
                            html += "'text'";
                        break;
                        case "binary":
                            html += "'text'";
                        break;
                        case "varbinary":
                            html += "'text'";
                        break;
                        case "tinyblob":
                            html += "'text'";
                        break;
                        case "mediumblob":
                            html += "'text'";
                        break;
                        case "blob":
                            html += "'text'";
                        break;
                        case "longblob":
                            html += "'text'";
                        break;
                        default:
                            html += "'text'";
                    }
                            
                    if(result.TBinfo[j].CHARACTER_MAXIMUM_LENGTH!=null)
                    html += "maxlength='"+result.TBinfo[j].CHARACTER_MAXIMUM_LENGTH+"' ";

                    if(result.data[i][result.TBinfo[j].COLUMN_NAME]!=null)
                    {
                        if(result.TBinfo[j].DATA_TYPE=="timestamp")
                        {

                            var t = result.data[i][result.TBinfo[j].COLUMN_NAME].split(/[- :]/);

                            var aux = t[0]+"-"+t[1]+"-"+t[2]+"T"+t[3]+":"+t[4]+":"+t[5];

                            html += "value='" + aux +"'";
                        }
                        else
                        {
                            html += "value='" + result.data[i][result.TBinfo[j].COLUMN_NAME] +"'";
                        }
                    }


                    html += ' id="modify'+ result.TBinfo[j].COLUMN_NAME +  result.data[i].id +'" name="'+ result.TBinfo[j].COLUMN_NAME +'"  class="col-12" placeholder="Enter '+ result.TBinfo[j].COLUMN_NAME +'">';

                    html += '</div>';

                    html += '<br>';
                }

                html += '</div>';


        
                //Modal footer
                html += '<div class="modal-footer">';
                if(canModify=="1")
                html += '<button type="button" class="btn btn-success" onclick="return modifyCRUD(\''+result.table+'\')" data-dismiss="modal">Modify</button>';
                if(canDelete=="1")
                html += '<button type="button" class="btn btn-secondary" onclick="return deleteCRUD(\''+result.table+'\')" data-dismiss="modal">Delete</button>';
                html += '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';

                //ENd create table modal
                }

                document.getElementById("information").innerHTML = html;
                //End change body

                }
                
                if(renderPager)
                {
                    //Change pager
                    html = "";
                    html += '<li class="page-item">';
                    html += '<a class="page-link" href="#" onclick="return searchData(\''+ result.table +'\',1)" aria-label="Previous">';
                    html += '<span aria-hidden="true">&laquo;</span>';
                    html += '<span class="sr-only">Previous</span>';
                    html += '</a>';
                    html += '</li>';

                    for(let i=1;i<=result.last_page;i++)
                    {
                        if(i==result.current_page)
                            html += '<li class="page-item active"><a class="page-link" href="#" onclick="return searchData(\''+ result.table +'\','+ i +')" > '+ i +' </a></li>';
                        else
                            html += '<li class="page-item"><a class="page-link" href="#" onclick="return searchData(\''+ result.table +'\','+ i +')" >'+ i +'</a></li>';
                    }
                    
                    html += '<li class="page-item">';
                    html += '<a class="page-link" href="#" onclick="return searchData(\''+ result.table +'\','+ result.last_page +')" aria-label="Next">';
                    html += '<span aria-hidden="true">&raquo;</span>';
                    html += '<span class="sr-only">Next</span>';
                    html += '</a>';
                    html += '</li>';
                    
                    document.getElementById("pagination").innerHTML = html;
                }
                //End change pager   
                
                disableInputModify();
            }
        }

        let ajaxURL = appURL+"search/"+ table +"/"+searchValue+"?page="+page+"&per_page="+perPage;

        if(!sortByDesc)
        {
            ajaxURL += "&sort_by=" + sortBy;
        }
        else
        {
            ajaxURL += "&sort_by_desc=" + sortBy;
            sortByDesc=false;
            sortBy="";
        }
        
        xhr.open('GET',ajaxURL,true);

        xhr.send();
        
        return false;
    }

    /* Start of Single page application */
    function getAllTables(page)
    {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function()
        {
            if(this.readyState==4 && this.status == 200)
            {
                //Convert XMLHttpRequest.response to JSON
                let result = JSON.parse(xhr.response);

                console.log(result);

                let html = "";

                //Change navbar
                html += '<ul class="navbar-nav mr-auto">';
                html += '<li class="nav-item">';
                html += '<a class="nav-link" href="#" onclick="getAllTables(1)">All tables</a>';
                html += '</li>';
                html += '</ul>';
                document.getElementById("navbarSupportedContent").innerHTML = html;
                //End change navbar

                //Change body
                html = "";

                for(let i=0;i<result.data.length;i++)
                {
                    
                    html += "<li class='list-group-item'>";

                    html += "<a href='#' class='btn btn-dark' onclick='return getDatas(\"" +result.data[i].Tables_in_kabucurd  +"\",1)'>"+result.data[i].Tables_in_kabucurd+"</button>";

                    html += "</li>";
                }               

                document.getElementById("information").innerHTML = html;
                //End change body
                
                //Change pager
                html = "";

                html += '<li class="page-item">';
                html += '<a class="page-link" href="#" onclick="return getAllTables(1);" aria-label="Previous">';
                html += '<span aria-hidden="true">&laquo;</span>';
                html += '<span class="sr-only">Previous</span>';
                html += '</a>';
                html += '</li>';

                for(let i=1;i<=result.last_page;i++)
                {
                    if(i==result.current_page)
                        html += '<li class="page-item active"><a class="page-link" href="#" onclick="return getAllTables('+ i +');" > '+ i +' </a></li>';
                    else
                        html += '<li class="page-item"><a class="page-link" href="#" onclick="return getAllTables('+ i +');" >'+ i +'</a></li>';
                }
                
                html += '<li class="page-item">';
                html += '<a class="page-link" href="#" onclick="return getAllTables('+ result.last_page +');" aria-label="Next">';
                html += '<span aria-hidden="true">&raquo;</span>';
                html += '<span class="sr-only">Next</span>';
                html += '</a>';
                html += '</li>';
                
                document.getElementById("pagination").innerHTML = html;

                //End change pager
            }
        }

        xhr.open('GET',appURL+"ALLTable"+"?page="+page,true);

        xhr.send();

        return false;
    }

    function createCRUD(table)
    {
        var xhr = new XMLHttpRequest();
        var parameter="";
        var lis = document.getElementById("modalCreate").getElementsByTagName("div");//Sacar todos los elementos de UL
        for(var i=0;i<lis.length;i++)
        {
            parameter+=lis[i].getElementsByTagName("input")[0].name;
            if(lis[i].getElementsByTagName("input")[0].type=="checkbox")
            {
                if(lis[i].getElementsByTagName("input")[0].checked)
                    parameter+= "=1";
                else
                    parameter+= "=0";       
            }
            else
            {
                parameter+= "=" + lis[i].getElementsByTagName("input")[0].value;    
            }
            
            if(i!=(lis.length-1))
            {
                parameter+="&";
            }
        }

        xhr.onreadystatechange = function()
        {
            if(this.readyState==4 && this.status == 200)
            {
                getDatas(table,1);
                if(renderAlert)
                {
                    let html ="";
                    html += '<div class="alert alert-success" role="alert" alert-dismissible fade show>';
                    html += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
                    html += 'Successfully created a new '+ table +'.';
                    html += '</div>';
                    document.getElementById('alert').innerHTML=html;
                }
            }
        }
        xhr.open('POST',appURL+"/"+table+"?"+parameter,true);

        xhr.send();

        return false;
    }

    function getDatas(table,page)
    {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4 && xhr.status == 200)
            {
                let result = JSON.parse(xhr.response);

                TableInformation = result.TBinfo;
                currentPage=result.current_page;
                searchValue="";

                let html = "";
                if(renderNavbar)
                {
                    //Change navbar
                    html += '<ul class="navbar-nav mr-auto">';
                    html += '<li class="nav-item">';
                    html += '<a href="#" onclick="return getDatas(\''+ result.table +'\',1)" class="nav-link">List of '+ result.table +'</a>';
                    html += '</li>';
                    if(canCreate=="1")
                    {
                        html += '<li class="nav-item" id="liCreateBoton">';
                        html += '<a href="#" id="createBoton" class="nav-link" data-toggle="modal" data-target="#createModal">Create '+ result.table +'</a>';
                        html += '</li>';
                    }
                    html += '</ul>';

                    html += '<div class="form-inline my-3 my-lg-0">';
                    html += '<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="seeker" id="seeker">';
                    html += '<button class="btn btn-outline-light my-2 my-sm-0" onclick="searchData(\''+ result.table +'\',1)" type="submit">Search</button>';

                    //Create table modal

                    html += '<div class="modal fade" id="createModal">';
                    html += '<div class="modal-dialog">';
                    html += '<div class="modal-content">';
          
                    // Modal Header 
                    html += '<div class="modal-header">';
                    html += '<h4 class="modal-title">Create '+ result.table +' </h4>';
                    html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
                    html += '</div>';
            
                    //Modal body
                    html += '<div class="modal-body" id="modalCreate">';
                    
                    for(let i = 1;i < result.TBinfo.length ;i++)
                    {
                        html += '<div class="container>';
                        html += '<label for="createNombre'+ result.TBinfo[i].COLUMN_NAME +'">' + result.TBinfo[i].COLUMN_NAME + '</label>';

                        html += '<input type=' ;

                        switch(result.TBinfo[i].DATA_TYPE)
                        {
                            case "int":
                                html += "'number'";
                            break;
                            case "varchar":
                                html += "'text'";
                            break;
                            case "date":
                                html += "'date'";
                            break;
                            case "text":
                                html += "'text'";
                            break;
                            case "tinyint":
                                html += "'checkbox'";
                            break;
                            case "smallint":
                                html += "'number' step='any'";
                            break;
                            case "mediumint":
                                html += "'number' step='any'";
                            break;
                            case "bigint":
                                html += "'number'";
                            break;
                            case "decimal":
                                html += "'number' step='any'";
                            break;
                            case "double":
                                html += "'number' step='any'";
                            break;
                            case "real":
                                html += "'number' step='any'";
                            break;
                            case "datetime":
                                html += "'date'";
                            break;
                            case "timestamp":
                                html += "'datetime-local'";
                            break;
                            case "time":
                                html += "'time'";
                            break;
                            case "year":
                                html += "'number' step='1' min='1901' max='2155' ";
                            break;
                            case "char":
                                html += "'text'";
                            break;
                            case "tinytext":
                                html += "'text'";
                            break;
                            case "mediumtext":
                                html += "'text'";
                            break;
                            case "longtext":
                                html += "'text'";
                            break;
                            case "binary":
                                html += "'text'";
                            break;
                            case "varbinary":
                                html += "'text'";
                            break;
                            case "tinyblob":
                                html += "'text'";
                            break;
                            case "mediumblob":
                                html += "'text'";
                            break;
                            case "blob":
                                html += "'text'";
                            break;
                            case "longblob":
                                html += "'text'";
                            break;
                            default:
                                html += "'text'";
                        }
                                
                        html += ' id="createNombre'+ result.TBinfo[i].COLUMN_NAME +'" name="'+ result.TBinfo[i].COLUMN_NAME +'"  class="col-12" placeholder="Enter '+ result.TBinfo[i].COLUMN_NAME +'">';

                        html += '</div>';

                        html += '<br>';
                    }

                    html += '</div>';


            
                    //Modal footer
                    html += '<div class="modal-footer">';
                    html += '<button type="button" class="btn btn-success" onclick="return createCRUD(\''+result.table+'\')" data-dismiss="modal">Create</button>';
                    html += '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';


                    //ENd create table modal

                    document.getElementById("navbarSupportedContent").innerHTML = html;
                    //End change navbar
                }

                if(renderTable)
                {
                //Change body
                html = "";
                html += '<table class="table table-hover mb-5">';
                html += '<thead class="thead-dark">';
                html += '<tr>';

                for(let i=0;i<result.TBinfo.length;i++)
                {
                    if(i==0)
                        html += '<th scope="col" onclick="sortData(\'id\');" title="Sort the table by id">#</th>';
                    else
                        html += '<th scope="col" onclick="sortData(this.innerHTML);" title="Sort the table by ' + result.TBinfo[i].COLUMN_NAME + ' " >'+ result.TBinfo[i].COLUMN_NAME +'</th>';
                }

                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                for(let i=0;i<result.data.length;i++)
                {
                    html += '<tr  data-toggle="modal" onclick="selectedId='+result.data[i].id+'" data-target="#modifyModal'+ result.data[i].id +'">';
                    for(let j=0;j<result.TBinfo.length;j++)
                    {
                        
                        // let TBinfoAux = result.TBinfo[j].COLUMN_NAME;
                        if(j==0)
                        {
                            html += '<th scope="row">' + result.data[i][result.TBinfo[j].COLUMN_NAME] + '</th>';
                        }
                        else
                        {
                            html += '<td>' + result.data[i][result.TBinfo[j].COLUMN_NAME] + '</td>';
                        }
                    }
                    html += '</tr>';
                }               

                html += '</tbody>';
                html += '</table>';

                //Modal modify for
                for(let i=0;i<result.data.length;i++)
                {
                //Modify table modal

                html += '<div class="modal fade" id="modifyModal'+ result.data[i].id +'">';
                html += '<div class="modal-dialog">';
                html += '<div class="modal-content">';
      
                // Modal Header 
                html += '<div class="modal-header">';
                html += '<h4 class="modal-title">Modify '+ result.table +' </h4>';
                html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
                html += '</div>';
        
                //Modal body
                html += '<div class="modal-body" id="modifyModalBody">';
                
                for(let j = 1;j < result.TBinfo.length ;j++)
                {
                    html += '<div class="container">';
                    html += '<label for="createNombre'+ result.TBinfo[j].COLUMN_NAME +'">' + result.TBinfo[j].COLUMN_NAME + '</label>';

                    html += '<input type=' ;

                    switch(result.TBinfo[j].DATA_TYPE)
                    {
                        case "int":
                            html += "'number'";
                        break;
                        case "varchar":
                            html += "'text'";
                        break;
                        case "date":
                            html += "'date'";
                        break;
                        case "text":
                            html += "'text'";
                        break;
                        case "tinyint":
                            html += "'checkbox'";
                            if(result.data[i][result.TBinfo[j].COLUMN_NAME]==1)
                                html += " checked ";
                        break;
                        case "smallint":
                            html += "'number' step='any'";
                        break;
                        case "mediumint":
                            html += "'number' step='any'";
                        break;
                        case "bigint":
                            html += "'number'";
                        break;
                        case "decimal":
                            html += "'number' step='any'";
                        break;
                        case "double":
                            html += "'number' step='any'";
                        break;
                        case "real":
                            html += "'number' step='any'";
                        break;
                        case "datetime":
                            html += "'date'";
                        break;
                        case "timestamp":
                            html += "'datetime-local'";
                        break;
                        case "time":
                            html += "'time'";
                        break;
                        case "year":
                            html += "'number' step='1' min='1901' max='2155' ";
                        break;
                        case "char":
                            html += "'text'";
                        break;
                        case "tinytext":
                            html += "'text'";
                        break;
                        case "mediumtext":
                            html += "'text'";
                        break;
                        case "longtext":
                            html += "'text'";
                        break;
                        case "binary":
                            html += "'text'";
                        break;
                        case "varbinary":
                            html += "'text'";
                        break;
                        case "tinyblob":
                            html += "'text'";
                        break;
                        case "mediumblob":
                            html += "'text'";
                        break;
                        case "blob":
                            html += "'text'";
                        break;
                        case "longblob":
                            html += "'text'";
                        break;
                        default:
                            html += "'text'";
                    }
                            
                    if(result.TBinfo[j].CHARACTER_MAXIMUM_LENGTH!=null)
                    html += "maxlength='"+result.TBinfo[j].CHARACTER_MAXIMUM_LENGTH+"' ";

                    if(result.data[i][result.TBinfo[j].COLUMN_NAME]!=null)
                    {
                        if(result.TBinfo[j].DATA_TYPE=="timestamp")
                        {

                            var t = result.data[i][result.TBinfo[j].COLUMN_NAME].split(/[- :]/);

                            var aux = t[0]+"-"+t[1]+"-"+t[2]+"T"+t[3]+":"+t[4]+":"+t[5];

                            html += "value='" + aux +"'";
                        }
                        else
                        {
                            html += "value='" + result.data[i][result.TBinfo[j].COLUMN_NAME] +"'";
                        }
                    }


                    html += ' id="modify'+ result.TBinfo[j].COLUMN_NAME +  result.data[i].id +'" name="'+ result.TBinfo[j].COLUMN_NAME +'"  class="col-12" placeholder="Enter '+ result.TBinfo[j].COLUMN_NAME +'">';

                    html += '</div>';

                    html += '<br>';
                }

                html += '</div>';


        
                //Modal footer
                html += '<div class="modal-footer">';
                if(canModify=="1")
                html += '<button type="button" class="btn btn-success" onclick="return modifyCRUD(\''+result.table+'\')" data-dismiss="modal">Modify</button>';
                if(canDelete=="1")
                html += '<button type="button" class="btn btn-secondary" onclick="return deleteCRUD(\''+result.table+'\')" data-dismiss="modal">Delete</button>';
                html += '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';


                //ENd create table modal

                }


                document.getElementById("information").innerHTML = html;
                //End change body
                }
                if(renderPager)
                {

                //Change pager
                html = "";
                html += '<li class="page-item">';
                html += '<a class="page-link" href="#" onclick="return getDatas(\''+ result.table +'\',1)" aria-label="Previous">';
                html += '<span aria-hidden="true">&laquo;</span>';
                html += '<span class="sr-only">Previous</span>';
                html += '</a>';
                html += '</li>';

                for(let i=1;i<=result.last_page;i++)
                {
                    if(i==result.current_page)
                        html += '<li class="page-item active"><a class="page-link" href="#" onclick="return getDatas(\''+ result.table +'\','+ i +')" > '+ i +' </a></li>';
                    else
                        html += '<li class="page-item"><a class="page-link" href="#" onclick="return getDatas(\''+ result.table +'\','+ i +')" >'+ i +'</a></li>';
                }
                
                html += '<li class="page-item">';
                html += '<a class="page-link" href="#" onclick="return getDatas(\''+ result.table +'\','+ result.last_page +')" aria-label="Next">';
                html += '<span aria-hidden="true">&raquo;</span>';
                html += '<span class="sr-only">Next</span>';
                html += '</a>';
                html += '</li>';
                
                document.getElementById("pagination").innerHTML = html;

                }

                //End change pager   

                disableInputModify();

            }
        }

        let ajaxURL = appURL+"/"+table+"?page="+page+"&per_page="+perPage;

        if(!sortByDesc)
        {
            ajaxURL += "&sort_by=" + sortBy;
        }
        else
        {
            ajaxURL += "&sort_by_desc=" + sortBy;
            sortByDesc=false;
            sortBy="";
        }

        xhr.open('GET',ajaxURL,true);
        
        xhr.send();

        return false;
    }

    function disableInputModify()
    {
        if(canModify!="1")
        {
            let inputs = document.querySelectorAll("#modifyModalBody input");

            for(let i=0;i<inputs.length;i++)
            {
                inputs[i].disabled=true;
            }
        }
    }


    function sortData(sortElemnt)
    {
        
        if(sortElemnt==sortBy)
            sortByDesc=true;

        sortBy=sortElemnt;
        
        getDatas(crudTable,1);
    }


    function sortSearchData(sortElemnt)
    {
        debugger;
        if(sortElemnt==sortBy)
            sortByDesc=true;

        sortBy=sortElemnt;
        
        searchData(crudTable,1);
    }