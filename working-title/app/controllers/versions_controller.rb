class VersionsController < ApplicationController

  def index
    @project = Project.find(params[:project_id])
    @versions = @project.versions
  end

  def show

    @version = Version.find(params[:id])
  end

  def create
    @version = Version.create(version_params)
    redirect_to version_path(@version)
  end

  private

  def version_params
    params.require(:version).permit(:contribution, :insertion_index, :previous_version_id)
  end
end
