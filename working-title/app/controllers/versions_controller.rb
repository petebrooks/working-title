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
  end
end
