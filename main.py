from flask import Flask, request, Response
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_cors import CORS
import subprocess
import base64
import json
from werkzeug.utils import secure_filename


app = Flask(__name__)
cors = CORS(app)
api = Api(app)


class TikzCode(Resource):
	def post(self):
		rawBase64 = request.form['data']
		fileName = "new"
		file = open("{0}.tex".format(fileName), "wb")
		file.truncate(0)
		line = base64.b64decode(rawBase64)
		file.write(line)
		subprocess.run(["./script.sh"], check=True)
		fileContent = open("{0}.png".format(fileName), "rb")
		fileContentBase64 = base64.b64encode(fileContent.read())
		return Response(fileContentBase64.decode("utf-8"), mimetype='image/png')


class TikzFile(Resource):
	def post(self): 
		#Save file and get the file name to prepare .sh file
		f = request.files['file']
		ending = f.filename.split(".")[1]
		if (ending == "tex"):
			fileName = "new"
			f.save(secure_filename("{0}.tex".format(fileName)))

			#Modified the .sh file to run latex and create png file
			subprocess.run(["./script.sh"], check=True)

			#Get the png file's content and return to client
			fileContent = open("{0}.png".format(fileName), "rb")
			fileContentBase64 = base64.b64encode(fileContent.read())
			
			return Response(fileContentBase64.decode("utf-8"), mimetype='image/png')
		else:
			abort(400)


api.add_resource(TikzCode, "/code")
api.add_resource(TikzFile, "/")

if __name__ == "__main__":
	app.run(debug=True)