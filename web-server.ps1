$httpListener = New-Object System.Net.HttpListener
$httpListener.Prefixes.Add("http://localhost:9090/")
$httpListener.Start()
# New-NetFirewallRule -DisplayName "AllowTestWebServer" -Direction Inbound -Protocol TCP -LocalPort 9090 -Action Allow

while (!([console]::KeyAvailable)) {
$context = $httpListener.GetContext()

$urlReq = $context.Request.Url -split ("/")
$urlReqs = ".\" + $urlReq[-1]
$EncodingWebContent = ""
$context.Response.ContentType = ""

if ($urlReq[-1] -eq "") {
    $WebContent = Get-Content -Path ".\main.html"
    $context.Response.ContentType = "text/html; charset=utf-8"
}
else {
    $WebContent = Get-Content -Path $urlReqs -Encoding UTF8
    $fileType = $urlReqs -split "."
    

    if ($fileType[-1] -eq "css") {
        $context.Response.ContentType = "text/css; charset=utf-8"
    }
    if ($fileType[-1] -eq "js") {
        $context.Response.ContentType = "text/javascript; charset=utf-8"
    }
}

$context.Response.StatusCode = 200
$EncodingWebContent = [Text.Encoding]::UTF8.GetBytes($WebContent)
$context.Response.OutputStream.Write($EncodingWebContent , 0, $EncodingWebContent.Length)
$context.Response.Close()
Write-Output "" # Newline
}
$httpListener.Close()