class Admin::MercuryController < Admin::AdminController

  layout false

  def edit
    render :text => '', :layout => 'mercury'
  end

  def resource
    render :action => "/#{params[:type]}/#{params[:resource]}"
  end

  def snippet_options
    @options = params[:options] || {}
    render :action => "/snippets/#{params[:name]}/options"
  end

  def snippet_preview
    render :action => "/snippets/#{params[:name]}/preview"
  end

  def test_page
    render :text => params
  end

  private

  def authenticate
    redirect_to "/#{params[:requested_uri]}" unless can_edit?
  end
end