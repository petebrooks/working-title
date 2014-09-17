class VersionsController < ApplicationController

  def index
    @project = Project.find(params[:project_id])
    @versions = @project.versions
  end

  def new
  end

  def show
    @project = Project.find(params[:project_id])
    @version = Version.find(params[:id])
  end

  def create
    @project = Project.find(params[:project_id])
    @version = @project.versions.create(version_params)
  end

  private

  def version_params
    params.require(:version).permit(:contribution, :insertion_index, :previous_version_id)
  end
end
