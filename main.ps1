# first open powershell
# second execute command: Set-ExecutionPolicy -Scope CurrentUser unrestricted
# write y
# start the script

$httpListener = New-Object System.Net.HttpListener
$httpListener.Prefixes.Add("http://localhost:9090/")
$httpListener.Start()
# New-NetFirewallRule -DisplayName "AllowTestWebServer" -Direction Inbound -Protocol TCP -LocalPort 9090 -Action Allow

# write-host "Press any key to stop the HTTP listener after next request"
while (!([console]::KeyAvailable)) { # !([console]::KeyAvailable)
$context = $httpListener.GetContext()

$urlReq = $context.Request.Url -split ("/")
$urlReqs = ".\" + $urlReq[-1]
$EncodingWebContent = ""
$context.Response.ContentType = ""
# write-host $urlReq[-1]

if ($urlReq[-1] -eq "") {
    $WebContent = Get-Content -Path ".\main.html" -Encoding UTF8
}
else {
    $WebContent = Get-Content -Path $urlReqs -Encoding UTF8
    $fileType = $urlReqs -split "."
    

    if ($fileType[-1] -eq "css") {
        $context.Response.ContentType = "text/css"
    }
    if ($fileType[-1] -eq "js") {
        $context.Response.ContentType = "text/javascript"
    }
}

$context.Response.StatusCode = 200
# $context.Response.ContentType = 'text/HTML'
# $WebContent = Get-Content -Path ".\main.html" -Encoding UTF8
$EncodingWebContent = [Text.Encoding]::UTF8.GetBytes($WebContent)
$context.Response.OutputStream.Write($EncodingWebContent , 0, $EncodingWebContent.Length)
$context.Response.Close()
Write-Output "" # Newline
}
$httpListener.Close()