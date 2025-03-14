# POWERSHELL nodejs 和 electron 保障脚本

# 要使用中文，必须将文件存为utf8BOM
[System.Console]::OutputEncoding = [System.Console]::InputEncoding = [System.Text.Encoding]::UTF8

#Write-Host 直接輸出
# 函數裏不要用 Write-Output,會混到返回值裏
# $true 是常量

# ps 可以 直接 执行命令，没有符号，函数调用用空格分隔参数
# 可以用循环，还是很友好的
# 不依赖函数执行顺序
function CheckNPM {
    try {
        $result = Run "npm -v"

        Write-Host "NodeJS 已安装=$result"
        return $true
    }
    catch {
        Write-Host "NodeJs 未安装。";
        return $false
    }
}
function CheckElectron {
    try {
        $result = Run "electron -v"

        Write-Host "Electron 已安装=$result"
        return $true
    }
    catch {
        Write-Host "electron 未安装。";
        return $false
    }
}
function CheckCNPM {
    try {
        $result = Run "cnpm -v"

        Write-Host "cnpm 已安装=$result"
        return $true
    }
    catch {
        Write-Host "cnpm 未安装。";
        return $false
    }
}
function Run {
    param (
        $cmd,
        $showcmd
    )
    if($showcmd)
    {
        Write-Host $cmd
    }
    Invoke-Expression -Command $cmd
    
    #. 能直接运行字符串
}

function CheckMenu {
    while ($true) {
        $isnode = CheckNPM
        $iselectron = CheckElectron

        Write-Host ”“
        Write-Host ”检查是否具备启动条件“
        Write-Host "Check Nodejs=$isnode"
        Write-Host "Check Electrons=$iselectron"
        if ($isnode -and $iselectron) {
            Write-Host "已经安装了环境."
    
            return $true;
        }
        Write-Host "1.Install NPM" -ForegroundColor Yellow
        Write-Host "2.Install Electron" -ForegroundColor Yellow
        Write-Host "3.Install Electron by cnpm[国内镜像] " -ForegroundColor Yellow
        $answer = Read-Host "Select."
        Write-Host "input" +$answer;  

        if ($answer -eq 1) {
            Write-Host "打开网页 https://nodejs.org/zh-cn 自行下载安装"
            Run "start https://nodejs.org/zh-cn"
        }
        if ($answer -eq 2) {
            $cmd = "npm install -g electron"
           
            Run $cmd $true
        }
        if ($answer -eq 3) {
            $cnpm =CheckCNPM
            if($cnpm -eq $false)
            {
                $cmd_cnpm ="npm install -g cnpm --registry=https://registry.npmmirror.com";
                Run $cmd_cnpm $true
            }
            $cmd = "cnpm install -g electron"
            Run $cmd $true
        }
    }
}

$result = CheckMenu
if ($result) {
    Write-Host "启动"
    Run "electron ."
}