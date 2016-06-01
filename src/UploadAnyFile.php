<?php
/**
 * @author dawn
 * 引入后实例化时传入一个配置数组即可
 * 
 * $upload=new UploadAnyFile(array(
 * 				'rootPath'      =>  '/data/upload_file/', //保存根路径    可以自己定义     路径和后面的依次组合构成完整的路径存放文件
				'savePath'      =>  'producer/product/picture/', //保存路径
				'pathTags'      =>  $org_id, //保存组别
				'subName'       =>  array('date'=>'Y-n-d'), //子目录创建方式，[0]-函数名，[1]-参数，多个参数使用数组
		));
		$result=$upload->upload();
 * 
 * 
 *
 */
namespace QCore\File\Local;

class UploadAnyFile{
	
	private $error = ''; //上传错误信息
	
	private $config = array(
        'mimes'         =>  array(), //允许上传的文件MiMe类型
        'maxSize'       =>  0, //上传的文件大小限制 (0-不做限制)单位 kb
        'postfix'       =>  array(), //允许上传的文件后缀 不带点
        'autoSub'       =>  false, //自动子目录保存文件
        'subName'       =>  array('date'=>'Y-n-d'), //子目录创建方式，[0]-函数名，[1]-参数，多个参数使用数组如果为false表示不设置子目录
        'rootPath'      =>  '/data/upload_file/', //保存根路径
        'savePath'      =>  '', //模块保存路径 例:producer/
        'pathTags'      =>  '', //保存组别
        'saveName'      =>  '', //上传文件命名规则   可以传入新的名字
        'saveExt'       =>  '', //文件保存后缀，空则使用原后缀
        'replace'       =>  false, //存在同名是否覆盖
        'callback'      =>  false, //检测文件是否存在回调，如果存在返回文件信息数组
    );
	
 	public function __construct($config=array()){
 		/* 获取配置 */
 		$this->config   =   array_merge($this->config, $config);
 		
 		if(!empty($this->config['postfix'])){
 			$this->config['postfix'] = array_map('strtolower', $this->config['postfix']);
 		}
	}
	
	public function upload($file=''){
		$retData  =  array('code' => 200, 'data' => array());//设置返回数组
		if(''===$file){
			$file  =   $_FILES;
		}
		//处理
		$file=$this->dealFile($file);
	
		/* 文件上传失败，捕获错误代码 */
		if ($file['error']) {
			$this->error(intval($file['error']));
			$retData['code']          =  501;
			$retData['data']['error'] = $this->error;
			return $retData;
		}
		
		//判断大小
		if(!$this->checkFileSize($file['size'])){
			$retData['code']          =  501;
			$retData['data']['error'] = '文件过大';
			return $retData;
		}
		$fileType   =  pathinfo($file['name']);//获取文件后缀
		
		$fileName = $this->getFileName($file['name']);//获取文件名称
		
		$fileName = $fileName.'.'.$fileType['extension'];
	
		if(!$this->checkFileType($fileType['extension'])){
			$retData['code']          =  501;
			$retData['data']['error'] = '文件格式不对';
			return $retData;//如果失败返回fasle
		}
		
		$newDir=$this->setdir();//获取新的文件地址
		
		if (!is_dir($newDir) && !file_exists($newDir)) {//判断是否存在路径
			$mkdirStatus = @mkdir($newDir, 0755, true);//如果没有则创建
			if ($mkdirStatus === false) {//判断是否创建成功
				$retData['code']          =  501;
				$retData['data']['error'] = '创建文件夹失败';
				return $retData;//如果失败返回fasle
			}
		}
		$tempdir     = $file['tmp_name'];  //获取缓存文件路径
		$newDirName  = $newDir.$fileName;  //构造存储文件全路径
		if (!@move_uploaded_file($tempdir, $newDirName)) {//判断是否移动成功
			$retData['code']          =  502;
			$retData['data']['error'] = '移动文件夹失败';
		}
		else {
			$retData['data']['file_path']     = $newDirName;
			$retData['data']['src_file_name'] = $this->setdir(true).$fileName;
			$retData['data']['file_size'] = UploadAnyFile::formatSize($file['size']);
			$retData['data']['date'] = date('Y-n-d H:i:s',time());
			error_log(var_export($retData,true),3,'/tmp/upload_file.log');
		}
		return $retData;
	}
	//获取名称
	private function getFileName($fileName,$filetype=''){
		if($this->config['saveName']!==''){
			$fileName=$this->config['saveName'];
		}else{
			$fileName=md5(uniqid()).$filetype;
		}
		
		return $fileName;
	}
	/**
	 * 处理base64编码的图片上传
	 * @return mixed
	 */
	public function upBase64($base64Data)
	{
		$retData  =  array('code' => 200, 'data' => array());//设置返回数组
		$base64Data=explode ( "," ,  $base64Data );
		
		$img = base64_decode($base64Data['1']);
	
		$this->fileSize = strlen($img);
		$this->fileName = $this->getFileName(uniqid(),'.jpg');
		
		$newDir = $this->setdir();
		$this->filePath = $newDir.$this->fileName;
		//判断大小
		if(!$this->checkFileSize($this->fileSize)){
			$retData['code']          =  501;
			$retData['data']['error'] = '文件过大';
			return $retData;
		}
		//创建目录失败
		if (!is_dir($newDir) && !file_exists($newDir)) {//判断是否存在路径
			$mkdirStatus = @mkdir($newDir, 0755, true);//如果没有则创建
			if ($mkdirStatus === false) {//判断是否创建成功
				$retData['code']          =  501;
				$retData['data']['error'] = '创建文件夹失败';
				return $retData;//如果失败返回fasle
			}
		}
	
		//移动文件
		if (!(file_put_contents($this->filePath, $img) && file_exists($this->filePath))) { //移动失败
			$retData['code']          =  502;
			$retData['data']['error'] = '移动文件夹失败';
		} else { //移动成功
			$retData['data']['file_path']     = $this->filePath;
			$retData['data']['src_file_name'] = $this->setdir(true).$this->fileName;
			$retData['data']['file_size'] = UploadAnyFile::formatSize($this->fileSize);
		}
		return $retData;
	}
	//检查大小
	private function checkFileSize($fileSize){
		if($this->config['maxSize']==0){
			return true;
		}elseif($this->config['maxSize']*1024>$fileSize){
			return true;
		}
		return false;
	}
	//构造正确的上传文件信息
	private function dealFile($file){
		$newFile=array();
		
		foreach($file as $k=>$v){
			if(is_array($v['name'])){
				
			}else{
				$newFile['name']     =  $v['name'];
				$newFile['type']     =  $v['type'];
				$newFile['size']     =  $v['size'];
				$newFile['tmp_name'] =  $v['tmp_name'];
				$newFile['error']    =  $v['error'];
			}
		}
		return $newFile;
	}
	//构造上传路径
	private function setdir($type=false){
		if(isset($this->config['subName']['date'])){
			$subName=date($this->config['subName']['date'],time());
		}elseif($this->config['subName']==false){
			$subName=false;
		}else{
			$subName=$this->config['subName'];
		}
		if($subName==false){
			$dir=$this->config['savePath'].'/'.$this->config['pathTags'].'/';  //构造存储文件路径
		}else{
			$dir=$this->config['savePath'].'/'.$this->config['pathTags'].'/'.$subName.'/';  //构造存储文件路径
		}
		
		if($type){
			return $dir;
		}else{
			$dir=$this->config['rootPath'].$dir;
			return $dir;
		}
		
	}
	//验证文件类型
	private function checkFileType($postfix){
		return empty($this->config['postfix']) ? true : in_array(strtolower($postfix), $this->config['postfix']);
	}
	/**
	 * 获取错误代码信息
	 * @param string $errorNo  错误号
	 */
	private function error($errorNo) {
		switch ($errorNo) {
			case 1:
				$this->error = '上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值！';
				break;
			case 2:
				$this->error = '上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值！';
				break;
			case 3:
				$this->error = '文件只有部分被上传！';
				break;
			case 4:
				$this->error = '没有文件被上传！';
				break;
			case 6:
				$this->error = '找不到临时文件夹！';
				break;
			case 7:
				$this->error = '文件写入失败！';
				break;
			default:
				$this->error = '未知上传错误！';
		}
		return $this->error;
	}
	/**
	 * 转化文件大小
	 * @param integer $size
	 * @return string
	 */
	private static function formatSize($size) {
	
		$kb = 1024;         // Kilobyte
		$mb = 1024 * $kb;   // Megabyte
		$gb = 1024 * $mb;   // Gigabyte
		$tb = 1024 * $gb;   // Terabyte
	
		if($size < $kb) {
			return $size." B";
		}else if($size < $mb) {
			return round($size/$kb,2)." KB";
		}else if($size < $gb) {
			return round($size/$mb,2)." MB";
		}else if($size < $tb) {
			return round($size/$gb,2)." GB";
		}else {
			return round($size/$tb,2)." TB";
		}
	}
	/**
     * 移动文件
     */
    public static function moveFile(){

    }
    /**
     * 保存文件
     */
    public static function saveFile($file,$fileType,$path,$rootPath='/data/upload_file/'){
        $retData  =  array('code' => 200, 'data' => array());//设置返回数组
        $path=$path.date('Y-n',time()).'/';
        $newDir=$rootPath.$path;
        $fileName=md5(uniqid()).'.'.$fileType;
        //创建目录失败
        if (!is_dir($newDir) && !file_exists($newDir)) {//判断是否存在路径
            $mkdirStatus = @mkdir($newDir, 0755, true);//如果没有则创建
            if ($mkdirStatus === false) {//判断是否创建成功
                $retData['code']          =  501;
                $retData['data']['error'] = '创建文件夹失败';
                return $retData;//如果失败返回fasle
            }
        }
        //移动文件
        if (!(file_put_contents($newDir.$fileName, $file) && file_exists($newDir.$fileName))) { //移动失败
            $retData['code']          =  502;
            $retData['data']['error'] = '移动文件夹失败';
        } else { //移动成功
            $retData['data']['file_path']     = $path.$fileName;
            $retData['data']['src_file_name'] = $newDir.$fileName;
            $retData['data']['file_size'] = UploadAnyFile::formatSize(strlen($file));
            if($fileType=='amr'){
                $newFilePath= str_replace('.amr','.mp3',$retData['data']['src_file_name']);

                exec('ffmpeg -i '.$retData['data']['src_file_name'].' '.$newFilePath);
                unlink($retData['data']['src_file_name']);
                $retData['data']['src_file_name']=$newFilePath;
                $retData['data']['file_path']= str_replace('.amr','.mp3',$retData['data']['file_path']);

            }
        }
        return $retData;
    }
}