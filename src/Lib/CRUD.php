<?php 
namespace App\Lib;

class CRUD {
	
	private $appURL;
	private $table;
	private $title;
	private $error;
	private $crudHTMLCode;
	private $canDelete;
	private $canModify;
	private $canCreate;
	private $renderNavbar;
	private $renderAlert;
	private $renderTable;
	private $renderPager;
	private $perPage;
	private $sortBy;
	private $sortByDesc;
	
	//Constructor
	public function __construct() 
	{

		$this->table		= '';		//table name
		$this->error 		= '';		//Eror code
		$this->canCreate 	= true;		//Can create element
		$this->canModify 	= true;		//Can delete element
		$this->canDelete 	= true;		//Can delete element
		$this->title 		= 'KabuCrud - A laravel CRUD component'; //Title of the page
		$this->crudHTMLCode = '';		//HTML code
		$this->renderNavbar = true;		//render the navbar
		$this->renderAlert	= true;		//Render the alert information
		$this->renderTable	= true;		//Render the table information
		$this->renderPager	= true;		//Render the pager information
		$this->perPage 		= 10;		//How muchu element render in every page
		$this->sortBy 		= "id";		//Default sort element
		$this->sortByDesc 	= false;	//If sorted descending
		$this->appURL		= env("APP_URL");
	}

	public function getTable()
	{
		return $this->table;
	}

	public function setTable($table)
	{
		$this->table=$table;
	}

	public function getTitle() 
	{ 
		return $this->titulo;
	}

	public function setTitle($title) 
	{ 
		$this->titulo=$title;
	}
	
	public function getCanDelete() 
	{ 
		return $this->canDelete;
	}

	public function setCanDelete($canDelete)
	{
		$this->canDelete = $canDelete;
	}

	public function getCanModify() 
	{ 
		return $this->canModify;
	}

	public function setCanModify($canModify)
	{
		$this->canModify = $canModify;
	}

	public function getCanCreate() 
	{ 
		return $this->canCreate;
	}

	public function setCanCreate($canCreate)
	{
		$this->canCreate = $canCreate;
	}


	public function getError() 
	{ 
		return $this->error;
	}

	public function setError($error)
	{
		$this->error = $error;
	}

	public function getRenderNavbar()
	{
		return $this->renderNavbar;
	}

	public function setRenderNavbar($renderNavbar)
	{
		$this->renderNavbar = $renderNavbar;

		//if we don´t render the navbar, we will render 9999 elemento in the page
		if(!$this->renderPager)
			$this->perPage 		= 9999;
		else
			$this->perPage 		= 10;
	}

	public function getRenderAlert()
	{
		return $this->renderAlert;
	}

	public function setRenderAlert($renderAlert)
	{
		$this->renderAlert = $renderAlert;
	}

	public function getRenderTable()
	{
		return $this->renderTable;
	}

	public function setRenderTable($renderTable)
	{
		$this->renderTable = $renderTable;
	}

	public function getRenderPager()
	{
		return $this->renderPager;
	}

	public function setRenderPager($renderPager)
	{
		$this->renderPager = $renderPager;
	}

	public function getSortBy()
	{
		return $this->sortBy;
	}

	public function setSortBy($sortBy)
	{
		$this->sortBy = $sortBy;
	}

	public function getSortByDesc()
	{
		return $this->sortByDesc;
	}

	public function setSortByDesc($sortByDesc)
	{
		$this->sortByDesc = $sortByDesc;
	}

	public function getPerPage()
	{
		return $this->perPage;
	}

	public function setPerPage($perPage)
	{
		if($this->renderPager)
		$this->perPage = $perPage;
	}

	public function getCrudHTMLCode() 
	{ 
		
		return $this->crudHTMLCode=="" ? "Empty html code" : $this->crudHTMLCode;
	}



	public function render() 
	{
		$resultHTML	= '';
		$resultJS	= '';
		$resultCSS	= '';


		if ($this->table!='') 
		{
			// $res = "la tabla es " . $this->table;
			// if ($this->canDelete) 
			// {
			// 	$res .= "no puede borrar datos";
			// }

			if($this->renderNavbar)
			{
				$resultHTML .= '<nav class="navbar navbar-expand-lg navbar-dark bg-dark top-navbar mb-5">';
      			$resultHTML .= '<a class="navbar-brand" href="'. $this->appURL .'/gestion">KabuCURD</a>';
      			$resultHTML .= '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">';
        		$resultHTML .= '<span class="navbar-toggler-icon"></span>';
      			$resultHTML .= '</button>';
      			$resultHTML .= '<div class="collapse navbar-collapse" id="navbarSupportedContent">';
      			$resultHTML .= '</div>';
    			$resultHTML .= '</nav>';
			}

			if($this->renderAlert)
			{
				$resultHTML .= '<div id="alert"">';
    			$resultHTML .= '</div>';
			}

			if($this->renderTable)
			{
				$resultHTML .= '<ul id="information" class="information list-group mt-5">';
    			$resultHTML .= '</ul>';
			}

			if($this->renderPager)
			{
				$resultHTML .= '<footer class="container fixed-bottom">';
			    $resultHTML .= '<div class="row justify-content-center align-items-center">';
			    $resultHTML .= '<nav aria-label="Page navigation example" class="paginador">';
			    $resultHTML .= '<ul class="pagination" id="pagination">';
			    $resultHTML .= '</ul>';
			    $resultHTML .= '</nav>';
			    $resultHTML .= '</div>';
			    $resultHTML .= '</footer>';
			}

		} 
		else 
		{
			$this->error="No hay tabla";
		}
		$this->crudHTMLCode = $resultHTML;
	}
}