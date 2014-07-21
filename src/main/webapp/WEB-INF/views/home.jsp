<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<title>Home</title>
<script src="${pageContext.request.contextPath}/libs/jquery/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/libs/editer/js/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/libs/SE2B_Image_Paster.js" charset="utf-8"></script>
</head>
<body>
	<textarea id="proposal" name="proposal" rows="10" cols="100"></textarea>
	<textarea id="figure" name="figure" rows="10" cols="100"></textarea>
<script>
	var proposal = new ClipboardImagePaster("proposal_area","proposal"); 
	var figure = new ClipboardImagePaster("figure_area","figure");
	var oEditors = [];
		
	nhn.husky.EZCreator.createInIFrame({
		oAppRef : oEditors,
		elPlaceHolder : "proposal",
		sSkinURI : "${pageContext.request.contextPath}/libs/editer/SmartEditor2Skin.html",
		fCreator : "createSEditor2",
		id : "proposal_area",
		fOnAppLoad : function(){
			proposal.init("${pageContext.request.contextPath}/base64ImageUpload.do");
		}
	});
	
	nhn.husky.EZCreator.createInIFrame({
		oAppRef : oEditors,
		elPlaceHolder : "figure",
		sSkinURI : "${pageContext.request.contextPath}/libs/editer/SmartEditor2Skin.html",
		fCreator : "createSEditor2",
		id : "figure_area",
		fOnAppLoad : function(){
			figure.init("${pageContext.request.contextPath}/base64ImageUpload.do");
		}
	});

	</script>
</body>
</html>