class VersionsController < ApplicationController

  def index
    @project = Project.find(params[:project_id])
    @versions = @project.versions
  end

  def show
    @version = Version.find(params[:id])
    @vote = Vote.new
  end

  def new
    @project = Project.find(params[:project_id])
  end

  def create
    @version = current_user.versions.create(version_params)
    respond_to do |format|
      format.html { redirect_to project_version_path(@version.project, @version) }
      format.json { render json: @version, id: @version.id }
    end
  end

  private
  def version_params
    params.require(:version).permit(:contribution, :insertion_index, :previous_version_id)
  end
end
