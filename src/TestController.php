<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Lib\CRUD;

class TestController extends Controller
{
    public function index() 
    {
    	return view('kabucrudinterfaz/index');
    }

    public function localidades() 
    {

    	$crud= new CRUD();
    	$crud->setTable("localidades");
    	
    	$crud->setTitle("Gestion de localidades");
    	$crud->setCanCreate(true);
    	$crud->setCanModify(false);
    	$crud->setCanDelete(false);
    	$crud->setRenderNavbar(true);
    	$crud->setRenderAlert(true);
    	$crud->setRenderTable(true);
    	$crud->setRenderPager(true);
    	$crud->setPerPage(8);
    	$crud->setSortBy("id");
    	$crud->setSortByDesc(false);


    	$crud->render();


    	if ($crud->getError()!='') {
    		$rendered=$crud->error;
    	}
    	return view('kabucrudinterfaz/example')
    	->with('crudHTML', $crud->getCrudHTMLCode())
    	->with('crudTable',$crud->getTable())
    	->with('canDelete', $crud->getCanDelete())
    	->with('canCreate', $crud->getCanCreate())
    	->with('canModify', $crud->getCanModify())
    	->with('crudTitle', $crud->getTitle())
    	->with('renderNavbar',$crud->getRenderNavbar())
    	->with('renderAlert',$crud->getRenderAlert())
    	->with('renderTable',$crud->getRenderTable())
    	->with('renderPager',$crud->getRenderPager())
    	->with('perPage',$crud->getPerPage())
    	->with('sortBy',$crud->getSortBy())
    	->with('sortByDesc',$crud->getSortByDesc());
    }

    public function users() 
    {

        $crud= new CRUD();
        $crud->setTable("users");
        
        $crud->setTitle("Gestion de usuarios");
        $crud->setCanCreate(true);
        $crud->setCanModify(true);
        $crud->setCanDelete(true);
        $crud->setRenderNavbar(true);
        $crud->setRenderAlert(true);
        $crud->setRenderTable(true);
        $crud->setRenderPager(true);
        $crud->setPerPage(10);
        $crud->setSortBy("nacionalidad");
        $crud->setSortByDesc(true);


        $crud->render();


        if ($crud->getError()!='') {
            $rendered=$crud->error;
        }
        return view('kabucrudinterfaz/example')
        ->with('crudHTML', $crud->getCrudHTMLCode())
        ->with('crudTable',$crud->getTable())
        ->with('canDelete', $crud->getCanDelete())
        ->with('canCreate', $crud->getCanCreate())
        ->with('canModify', $crud->getCanModify())
        ->with('crudTitle', $crud->getTitle())
        ->with('renderNavbar',$crud->getRenderNavbar())
        ->with('renderAlert',$crud->getRenderAlert())
        ->with('renderTable',$crud->getRenderTable())
        ->with('renderPager',$crud->getRenderPager())
        ->with('perPage',$crud->getPerPage())
        ->with('sortBy',$crud->getSortBy())
        ->with('sortByDesc',$crud->getSortByDesc());
    }
}
