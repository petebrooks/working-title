class SearchController < ApplicationController

	def new
		query = params[:text]

		@projects = Project.where("name LIKE ?", "%#{query}%")

		respond_to do |format|
			format.html
			format.json { render :json => @projects }
		end
	end
end
