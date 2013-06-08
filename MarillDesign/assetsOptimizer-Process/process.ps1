<#
LESS files are compiled, renamed to .css, and placed into a sibling css directory.
JAVASCRIPT files are minified, renamed to .min.js, and placed into the same directory.
#>

#Change to the scripts directory
$scriptFolder = $MyInvocation.MyCommand.Path;
$scriptPath = Split-Path $scriptFolder;
cd $scriptPath;


#import dependencies
Import-Module (".\minJS");

#Get FileOptimizer64.exe full path
#We think that this includes metadata stripping
$fileOpt = Get-ChildItem -recurse | Where-Object { $_.Name -match 'FileOptimizer64.exe'}

#store and change to the assets folder
cd ..
$assetsFolder = Get-ChildItem | Where-Object { $_.Name -match 'assets-\d' }
$assetsPath = $assetsFolder.FullName;
cd $assetsPath;

<#
TODO
Create the css directory if it doesn't exist.
In the meantime, just create it manually.
#>

@'
------------------
process lesscss
------------------
'@
$files_less = Get-ChildItem -recurse -include *.less | Where-Object { 'bootstrap', 'responsive', 'bigfont' -contains $_.BaseName }
foreach ($file in $files_less)
{       
    $savePath = $file.FullName -replace "less", "css" -replace '\.css', '.min.css'
    lessc -x $file.FullName > $savePath;
    #print results
    '-' + $savePath;
}

@'
------------------
process js
------------------
'@
$files_js = Get-ChildItem -recurse -include *.js -Exclude *.min.js | Where-Object { 'bigfont' -contains $_.BaseName }
foreach ($file in $files_js)
{           
    $str = Get-Content -Path $file.FullName;
    $min = (minify -inputData $str -inputDataType "js");    
    $savePath = ($file.FullName -replace "`\.js", '.min.js');    
    $min | Out-File $savePath;
    #print results
    '-' + $savePath;
}

#Run FileOptimizer
<#
& $fileOpt.FullName $Assetsfolder.FullName
#>


#prevent exiting
[Console]::ReadLine();

