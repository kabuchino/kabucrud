<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Schema;
use Illuminate\Pagination\LengthAwarePaginator;

class CRUDController extends Controller
{
	public function homePage()
	{
		return view('home');		
	}

    public function index($table)
    {

    	//Get information of table
    	$TBinfo = DB::table("INFORMATION_SCHEMA.COLUMNS")
    	->select('COLUMN_NAME','DATA_TYPE','IS_NULLABLE','COLUMN_DEFAULT','CHARACTER_MAXIMUM_LENGTH')
    	->where('table_name','=',$table)
    	->where('table_schema','!=','performance_schema')
    	->get();


    	//Get datas of table
		$datas = DB::table($table)->get();

		/***********************/
		/*Sort by Start*/

		if(request()->has('sort_by'))
		{
			$datas = $datas->sortBy->{request()->sort_by};
		}
		else if(request()->has('sort_by_desc'))
		{
			$datas = $datas->sortByDesc->{request()->sort_by_desc};
		}


		/*Sort by finish*/
		/***********************/


		/***********************/
		/*Pager Start*/
		$page = LengthAwarePaginator::resolveCurrentPage();
		$perPage = 5;
		if(request()->has('per_page'))
		{
			$perPage=(int) request()->per_page;
		}

		$results = $datas->slice(($page - 1)* $perPage,$perPage)->values();

		//Pager for datas
		$paginated = new LengthAwarePaginator($results,$datas->count(),$perPage,$page,[
			'path'	=> LengthAwarePaginator::resolveCurrentPath(),
		]);
		
		$paginated->appends(request()->all());

		/*Pager Finish*/
		/***********************/

		$result = collect($paginated);

		$result = $result->merge(['table'=>$table]);
		
		$result = $result->merge(['TBinfo'=>$TBinfo]);

		return $result;		

    	// return view('listado')->with('datas', $paginated)->with('table', $table)->with('TBinfo',$TBinfo);
    }

  //   public function show($table,$id)
  //   {

		// $columns = Schema::getColumnListing($table);

  //   	$datas = DB::table($table)->where('id','=',$id)->get();

  //   	return view('showOne')->with('datas',$datas)->with('columns',$columns)->with('table', $table);
  //   }

    public function update(Request $request,$table,$id)
    {
    	$columns = Schema::getColumnListing($table);

    	$array = [];

    	foreach ($columns as $column) {
    		if($column!="id")
    		{
    			$array+= [$column => $request->$column];
    		}
    		
    	}

    	// DB::table($table)->where('id',$id)->update(['nombre' => $request->nombre]);
    	DB::table($table)->where('id',$id)->update($array);
    }

    public function store(Request $request,$table)
    {
    	$columns = Schema::getColumnListing($table);

    	$array = [];

    	foreach ($columns as $column) 
    	{
    		if($column!="id")
    		{
    			$array+= [$column => $request->$column];
    		}
    	}

		DB::table($table)->insert(
		    $array
		);
    }

    public function delete($table,$id)
    {
    	DB::table($table)->where('id','=',$id)->delete();
    }

    public function search($table,$parameter)
    {

    	$TBinfo = DB::table("INFORMATION_SCHEMA.COLUMNS")
    			->select('COLUMN_NAME','DATA_TYPE','IS_NULLABLE','COLUMN_DEFAULT','CHARACTER_MAXIMUM_LENGTH')
    			->where('table_name','=',$table)
    			->where('table_schema','!=','performance_schema')
    			->get();
    	
    	// dd($TBinfo);
		// use($TBinfo, $parameter) Pass de variables to the local scope
		$datas = DB::table($table)->where(function($query) use($TBinfo, $parameter)
		{
			for($i=1;$i<count($TBinfo);$i++)
			{
					$query->orWhere($TBinfo[$i]->COLUMN_NAME,'like','%' . $parameter . '%');
			}
		})->get();



		/***********************/
		/*Sort by Start*/

		if(request()->has('sort_by'))
		{
			$datas = $datas->sortBy->{request()->sort_by};
		}
		else if(request()->has('sort_by_desc'))
		{
			$datas = $datas->sortByDesc->{request()->sort_by_desc};
		}


		/*Sort by finish*/
		/***********************/


		
		/***********************/
		/*Pager Start*/
		$page = LengthAwarePaginator::resolveCurrentPage();
		$perPage = 5;
		if(request()->has('per_page'))
		{
			$perPage=(int) request()->per_page;
		}

		$results = $datas->slice(($page - 1)* $perPage,$perPage)->values();

		//Pager for datas
		$paginated = new LengthAwarePaginator($results,$datas->count(),$perPage,$page,[
			'path'	=> LengthAwarePaginator::resolveCurrentPath(),
		]);
		
		$paginated->appends(request()->all());

		/*Pager Finish*/
		/***********************/

		$result = collect($paginated);

		$result = $result->merge(['table'=>$table]);
		
		$result = $result->merge(['TBinfo'=>$TBinfo]);

		return $result;		

    }

    public function show_all_table()
	{
		$tables = collect(DB::select('show tables'));

		
		// $url = env("APP_URL", "somedefaultvalue");


		// $result = collect($result);

		// $result = $paginated->merge(['app_url'=>$url]);


		return $this->showAll($tables);
	}

}
